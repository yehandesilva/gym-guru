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
from psycopg2.extras import RealDictCursor
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

    except (PostgresError, Exception) as query_err:
        print(f"[QUERY ERROR] {query_err}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(query_err)}), 500)


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
        cursor.execute("INSERT INTO member (member_id, first_name, last_name, email, date_of_birth, height, weight, next_pay_date, subscription_id) "
                       "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (account_id, member['first_name'], member['last_name'], member['email'], member['date_of_birth'],
                        member['height'], member['weight'], billing_date, member['subscription_id']))
        # Commit changes
        db_conn.commit()
        # Return response as OK
        return Response(status=200)

    except (PostgresError, psycopg2.IntegrityError, Exception) as query_err:
        print(f"[QUERY ERROR] {query_err}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(query_err)}), 500)


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
        if len(account_info) == 0:
            # No tuples returned (i.e. username/password is invalid or account doesn't exist)
            return make_response(jsonify({'error_message': 'Username/password invalid'}), 404)
        elif len(account_info) == 1:
            # Account found, so check if account belongs to member
            print(f"[LOG] Account exists for username = {credentials['username']} and password = {credentials['password']}")
            account_type = account_info[0]['type']
            account_id = account_info[0]['account_id']
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

            # Convert data into JSON format (str) (to convert Decimal type to decimal numbers)
            json_data = simplejson.dumps(user_info, use_decimal=True)
            print(f"[LOG] User data converted to JSON str: {json_data}")
            # Return Response with user info as JSON and OK status
            return make_response(jsonify(json_data), 200)
        else:
            print("[ERROR] Duplicated account found!")
            return make_response(jsonify({'error_message': 'More than one account exists with provided credentials'}), 404)

    except (PostgresError, psycopg2.IntegrityError, Exception) as query_err:
        print(f"[QUERY ERROR] {query_err}")
        # Reset transaction state
        db_conn.rollback()
        # Return response containing thrown error and status code of INTERNAL SERVER ERROR
        return make_response(jsonify({'error_message': str(query_err)}), 500)

# Main method
if __name__ == '__main__':
    # Run backend server on port 5000 (React app is running on 3000)
    app.run(port=4000, debug=True, use_reloader=False)
