"""
Backend server for Gym Guru.

@author Pathum Danthanarayana, 101181411
@date April 11, 2024
"""
from flask import Flask, jsonify, request, Response, json, make_response
import simplejson as simplejson
from flask_cors import CORS, cross_origin
import psycopg2
from psycopg2 import Error as PostgresError
from psycopg2.extras import RealDictCursor, RealDictRow
from datetime import date
from dateutil.relativedelta import relativedelta

# Create Flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Fields for accessing Gym Guru database
database_name = "GymGuru"
user = "postgres"
password = "postgres"
host = "localhost"
port = 5432

# Establish connection to the database
try:
    # NOTE: Change database name, user, password, and port (above) based on your PostgreSQL configurations
    db_conn = psycopg2.connect(database=database_name,
                               user=user,
                               password=password,
                               host=host,
                               port=port)
    print("[CONNECTION] SUCCESS: Backend server established connection to the Gym Guru database")
except (PostgresError, Exception) as connectionErr:
    print("[CONNECTION] ERROR: Connection to the Gym Guru database failed: " + connectionErr)
    exit()

# FUNCTIONS FOR DEFINING ROUTES

"""
Returns info for all the different subscription models
available.
"""
@app.route('/subscription_models', methods=['GET'])
@cross_origin()
def get_subscription_models():
    print("[LOG] Received request to get subscription models")
    # Use RealDictCursor to return data as dictionary format
    cursor = db_conn.cursor(cursor_factory=RealDictCursor)
    try:
        # Get info on all subscription models
        cursor.execute("SELECT * FROM subscription")
        subscription_models = cursor.fetchall()
        print(f"[QUERY] Subscription models: {subscription_models}")

        # Convert data into JSON format (str) (to convert Decimal type to decimal numbers)
        json_data = simplejson.dumps(subscription_models, use_decimal=True)
        print(f"[LOG] Subscription model data converted to JSON str: {json_data}")
        # Return Response with JSON data
        return jsonify(json_data)

    except (PostgresError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Registers a new member by first creating a new account for them,
and then creating a new entry for them in the Members table.
"""
@app.route('/register_member', methods=['POST'])
@cross_origin()
def register_member():
    cursor = db_conn.cursor()
    try:
        # Get JSON data from received request
        member = json.loads(request.data)
        account_type = "member"
        print(f"[LOG] Received request to register member: {member}")

        # Insert new tuple into Account table, and return its account_id (PK)
        cursor.execute("INSERT INTO account (username, password, type) VALUES (%s, %s, %s) RETURNING account_id",
                       (member['username'], member['password'], account_type))
        account_id = int(cursor.fetchone()[0])
        print(f"[LOG]: New account ID: {account_id}")
        # Commit changes
        db_conn.commit()

        # Compute next pay date for member (based on selected subscription)
        cursor.execute("SELECT type FROM subscription WHERE subscription_id = %s", (member['subscription_id'],))
        subscription_type = str(cursor.fetchone()[0])

        current_date = date.today()
        if subscription_type == 'Monthly':
            # Add a month to the current date
            billing_date = str(current_date + relativedelta(months=1))
        elif subscription_type == 'Annual':
            # Add a year to the current date
            billing_date = str(current_date + relativedelta(years=1))
        else:
            print(f"[ERROR] Unknown subscription type returned from server: {subscription_type}")
            return Response(status=500)

        # Insert new tuple into Member table (using account_id as member_id)
        cursor.execute("INSERT INTO member (member_id, first_name, last_name, email, date_of_birth, height, weight, next_pay_date, subscription_id, card_number) "
                       "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (account_id, member['first_name'], member['last_name'], member['email'], member['date_of_birth'],
                        member['height'], member['weight'], billing_date, member['subscription_id'], member['card_number']))
        # Commit changes
        db_conn.commit()
        # Return response as OK
        return Response(status=200)

    except (PostgresError, psycopg2.IntegrityError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Returns all attributes of the member (as well as their account info) matching 
the provided account username and password.
If the username and password is invalid, a 404 response is returned
"""
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    print("[LOG] Received request to find member associated with username/password")
    # Use RealDictCursor to return data as dictionary format
    cursor = db_conn.cursor(cursor_factory=RealDictCursor)

    try:
        # Get JSON data from received request
        credentials = json.loads(request.data)

        # Check if username/password exists
        cursor.execute("SELECT account_id, type FROM account WHERE (username=%s AND password=%s)",
                       (credentials['username'], credentials['password']))
        account_info = cursor.fetchone()
        if account_info is None:
            # No tuples returned (i.e. username/password is invalid or account doesn't exist)
            return make_response(jsonify({'error_message': 'Username/password invalid'}), 404)
        elif isinstance(account_info, RealDictRow):
            # Account found, so check if account belongs to member
            print(f"[LOG] Account exists for username = {credentials['username']} and password = {credentials['password']}")
            account_info = dict(account_info)
            account_type = account_info['type']
            account_id = account_info['account_id']
            if account_type == 'member':
                # Account belongs to member,
                # so join account and member table on account_id and member_id to get all info for member
                cursor.execute("SELECT * FROM account JOIN member ON account.account_id = member.member_id WHERE account_id = %s",
                               (account_id,))
                user_info = cursor.fetchone()
            elif account_type == 'trainer':
                # Account belongs to trainer,
                # so join account and trainer table on account_id and trainer_id to get all info for trainer
                cursor.execute(
                    "SELECT * FROM account JOIN trainer ON account.account_id = trainer.trainer_id WHERE account_id = %s",
                    (account_id,))
                user_info = cursor.fetchone()
            elif account_type == 'admin':
                # Account belongs to admin,
                # so join account and admin table on account_id and admin_id to get all info for admin
                cursor.execute(
                    "SELECT * FROM account JOIN admin ON account.account_id = admin.admin_id WHERE account_id = %s",
                    (account_id,))
                user_info = cursor.fetchone()
            else:
                print("[ERROR] Unknown account type returned from server")
                return make_response(jsonify({'error_message': 'Unknown account type returned from server'}), 404)

            # Convert data into JSON format (str) (to convert Decimal type and Date type)
            json_data = simplejson.dumps(user_info, use_decimal=True, default=str)
            print(f"[LOG] User data converted to JSON str: {json_data}")
            # Return Response with user info as JSON and OK status
            return jsonify(json_data)
        else:
            # Other possibility is a list of items of type RealDictRow (meaning multiple accounts)
            print("[ERROR] Duplicated account found!")
            return make_response(jsonify({'error_message': 'More than one account exists with provided credentials'}), 404)

    except (PostgresError, psycopg2.IntegrityError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Updates the member's personal information with the provided info.
"""
@app.route('/update_member_info', methods=['POST'])
@cross_origin()
def update_member_info():
    cursor = db_conn.cursor()
    try:
        # Get JSON data from received request
        member = json.loads(request.data)
        print("[LOG] Received request to update member's personal info")

        # Update the member's personal info
        cursor.execute("UPDATE member SET "
                       "first_name = %s, last_name = %s, email = %s, date_of_birth = %s, height = %s, weight = %s, "
                       "subscription_id = %s, card_number = %s"
                       "WHERE member_id = %s",
                       (member['first_name'], member['last_name'], member['email'], member['date_of_birth'], member['height'],
                        member['weight'], member['subscription_id'], member['card_number'], member['member_id']))

        # Update the member's account info
        cursor.execute("UPDATE account SET username = %s, password = %s WHERE account_id = %s",
                       (member['username'], member['password'], member['member_id']))
        # Commit changes
        db_conn.commit()
        # Return OK response
        return Response(status=200)

    except (PostgresError, psycopg2.IntegrityError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


# EDIT PERSONAL INFO FOR MEMBER

"""
Returns all the different skills in the Skill table
"""
@app.route('/skills', methods=['GET'])
@cross_origin()
def get_skills():
    print("[LOG] Received request to get all skills")
    # Use RealDictCursor to return data as dictionary format
    cursor = db_conn.cursor(cursor_factory=RealDictCursor)
    try:
        # Get info on all skills (skill_id and name)
        cursor.execute("SELECT * FROM skill")
        skills = cursor.fetchall()
        print(f"[QUERY] Skills: {skills}")

        json_data = json.dumps(skills)
        print(f"[LOG] Skill data converted to JSON str: {json_data}")
        # Return Response with JSON data
        return jsonify(json_data)

    except (PostgresError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Adds a new interest for a particular member.
"""
@app.route('/add_interest', methods=['POST'])
@cross_origin()
def add_interest():
    cursor = db_conn.cursor()
    try:
        # Get JSON data from received request
        interest = json.loads(request.data)
        print(interest)
        print(interest['member_id'])
        print(interest['skill_id'])
        print("[LOG] Received request to add new interest for member")

        # Update the member's personal info
        cursor.execute("INSERT INTO interest (member_id, skill_id) VALUES (%s, %s)",
                       (interest['member_id'], interest['skill_id']))
        # Commit changes
        db_conn.commit()
        # Return OK response
        return Response(status=200)

    except (PostgresError, psycopg2.IntegrityError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Removes/deletes an interest for a particular member.
"""
@app.route('/delete_interest', methods=['POST'])
@cross_origin()
def delete_interest():
    cursor = db_conn.cursor()
    try:
        # Get JSON data from received request
        interest = json.loads(request.data)
        print("[LOG] Received request to delete interest for member")

        # Update the member's personal info
        cursor.execute("DELETE FROM interest WHERE (member_id = %s AND skill_id = %s)",
                       (interest['member_id'], interest['skill_id']))
        # Commit changes
        db_conn.commit()
        # Return OK response
        return Response(status=200)

    except (PostgresError, psycopg2.IntegrityError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Returns all the interest names associated with a particular member.
"""
@app.route('/interest_names', methods=['POST'])
@cross_origin()
def get_interest_names():
    print("[LOG] Received request to get all interests associated with member")
    # Use RealDictCursor to return data as dictionary format
    cursor = db_conn.cursor(cursor_factory=RealDictCursor)
    try:
        # Get JSON data from received request
        member = json.loads(request.data)
        # Get info on all interests that member has
        cursor.execute("SELECT skill.name FROM interest JOIN skill ON interest.skill_id = skill.skill_id WHERE member_id = %s",
                       (member['member_id'],))
        interests_names = cursor.fetchall()
        print(f"[QUERY] Interest names for member: {interests_names}")

        json_data = json.dumps(interests_names)
        print(f"[LOG] Interest names converted to JSON str: {json_data}")
        # Return Response with JSON data
        return jsonify(json_data)

    except (PostgresError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown exception and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


# MANAGE FITNESS CLASSES FOR MEMBER

"""
Returns all the uncompleted fitness goals for a specific member.
"""
@app.route('/uncompleted_fitness_goals', methods=['POST'])
@cross_origin()
def get_uncompleted_fitness_goals():
    print("[LOG] Received request to get all uncompleted fitness goals for member")
    # Use RealDictCursor to return data as dictionary format
    cursor = db_conn.cursor(cursor_factory=RealDictCursor)
    try:
        # Get JSON data from received request
        member = json.loads(request.data)
        # Get info about all uncompleted fitness goals for a member
        cursor.execute("SELECT fitness_goal_id, member_id, name, end_date, target_goal, current_value, completed"
                       " FROM member NATURAL JOIN fitness_goal WHERE (member_id = %s AND completed = %s)",
                       (member['member_id'], "false",))
        uncompleted_fitness_goals = cursor.fetchall()
        print(f"[QUERY] Uncompleted fitness goals: {uncompleted_fitness_goals}")

        # Convert data into JSON format (str) (to convert Decimal type and Date type)
        json_data = simplejson.dumps(uncompleted_fitness_goals, use_decimal=True, default=str)
        print(f"[LOG] Uncompleted fitness goals converted to JSON str: {json_data}")
        # Return Response with JSON data
        return jsonify(json_data)

    except (PostgresError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Returns all the completed fitness goals for a specific member.
"""
@app.route('/completed_fitness_goals', methods=['POST'])
@cross_origin()
def completed_fitness_goals():
    print("[LOG] Received request to get all completed fitness goals for member")
    # Use RealDictCursor to return data as dictionary format
    cursor = db_conn.cursor(cursor_factory=RealDictCursor)
    try:
        # Get JSON data from received request
        member = json.loads(request.data)
        # Get info about all uncompleted fitness goals for a member
        cursor.execute("SELECT fitness_goal_id, member_id, name, end_date, target_goal, current_value, completed"
                       " FROM member NATURAL JOIN fitness_goal WHERE (member_id = %s AND completed = %s)",
                       (member['member_id'], "true",))
        completed_fitness_goals = cursor.fetchall()
        print(f"[QUERY] Completed fitness goals: {completed_fitness_goals}")

        # Convert data into JSON format (str) (to convert Decimal type and Date type)
        json_data = simplejson.dumps(completed_fitness_goals, use_decimal=True, default=str)
        print(f"[LOG] Completed fitness goals converted to JSON str: {json_data}")
        # Return Response with JSON data
        return jsonify(json_data)

    except (PostgresError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Adds a new fitness_goal for a specific member.
"""
@app.route('/add_fitness_goal', methods=['POST'])
@cross_origin()
def add_fitness_goal():
    print("[LOG] Received request to add new fitness goal for member")
    # Use RealDictCursor to return data as dictionary format
    cursor = db_conn.cursor()
    try:
        # Get JSON data from received request
        fitness_goal = json.loads(request.data)
        # Insert fitness goal for specified member corresponding to the provided fitness_goal_id
        cursor.execute("INSERT INTO fitness_goal (member_id, name, end_date, target_goal, current_value, completed) "
                       "VALUES (%s, %s, %s, %s, %s, %s)",
                       (fitness_goal['member_id'], fitness_goal['name'], fitness_goal['end_date'], fitness_goal['target_goal'],
                        fitness_goal['current_value'], fitness_goal['completed']))
        # Commit change
        db_conn.commit()
        # Return OK response
        return Response(status=200)

    except (PostgresError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)


"""
Updates a specific fitness goal for a specific member.
"""
@app.route('/update_fitness_goal', methods=['POST'])
@cross_origin()
def update_fitness_goal():
    print("[LOG] Received request to update fitness goal for member")
    # Use RealDictCursor to return data as dictionary format
    cursor = db_conn.cursor()
    try:
        # Get JSON data from received request
        fitness_goal = json.loads(request.data)
        # Update fitness goal for specified member corresponding to the provided fitness_goal_id
        cursor.execute("UPDATE fitness_goal SET name = %s, end_date = %s, target_goal = %s, current_value = %s,  completed = %s "
                       "WHERE (fitness_goal_id = %s AND member_id = %s)",
                       (fitness_goal['name'], fitness_goal['end_date'], fitness_goal['target_goal'],
                        fitness_goal['current_value'], fitness_goal['completed'], fitness_goal['fitness_goal_id'], fitness_goal['member_id']))
        # Commit change
        db_conn.commit()
        # Return OK response
        return Response(status=200)

    except (PostgresError, Exception) as e:
        print(f"[EXCEPTION] {e}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(e)}), 500)

# Main method
if __name__ == '__main__':
    # Run backend server on port 5000 (React app is running on 3000)
    app.run(port=4000, debug=True, use_reloader=False)
