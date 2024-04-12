"""
Backend server for Gym Guru.

@author Pathum Danthanarayana, 101181411
@date April 11, 2024
"""
from flask import Flask
from flask import jsonify
from flask import request
from flask import Response
import simplejson as json
from flask_cors import CORS, cross_origin
import psycopg2
from psycopg2 import Error as PostgresError
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

# FUNCTIONS FOR PERFORMING SQL QUERIES

"""
Returns info for all the different subscription models
available.
"""
@app.route('/subscription_models', methods=['GET'])
@cross_origin()
def get_subscription_models():
    print("[LOG] Received request to get subscription models")
    cursor = db_conn.cursor()
    try:
        # Get info on all subscription models
        cursor.execute("SELECT * FROM subscription")
        subscription_models = cursor.fetchall()
        print(f"[QUERY] Subscription models: {subscription_models}")
        # Return tuples as JSON to front-end
        json_data = json.dumps(subscription_models, use_decimal=True)
        subscription_response = app.response_class(response=json.dumps(json_data),
                                      status=200,
                                      mimetype='application/json')
        return subscription_response
    except (PostgresError, Exception) as queryErr:
        print(f"[QUERY ERROR] {queryErr}")
        # Return response as INTERNAL SERVER ERROR
        return Response(status=500)


"""
Registers a new member by first creating a new account for them,
and then creating a new entry for them in the Members table.
"""
@app.route('/register_member', methods=['POST'])
def register_member():
    cursor = db_conn.cursor()
    try:
        # Get next account_id value (to be associated with new account being created)
        member = json.loads(request.data)
        account_type = "member"
        print(f"[LOG] Received request to register member: {member}")

        # Insert new tuple into Account table, and return its account_id (PK)
        cursor.execute("INSERT INTO account (email, password, type) VALUES (%s, %s, %s) RETURNING account_id",
                       (member['email'], password, account_type))
        account_id = int(cursor.fetchone()[0])
        print(f"[LOG]: New account ID: {account_id}")
        # Commit changes
        db_conn.commit()

        # Compute next pay date for member (based on selected subscription)
        cursor.execute("SELECT type FROM subscription WHERE subscription_id = %s", (member['subscription_id'],))
        subscription_type = str(cursor.fetchone()[0])

        current_date = date.today()
        if subscription_type.lower() == 'monthly':
            # Add a month to the current date
            billing_date = str(current_date + relativedelta(months=1))
        elif subscription_type.lower() == 'annual':
            # Add a year to the current date
            billing_date = str(current_date + relativedelta(years=1))
        else:
            print(f"[ERROR] Unknown subscription type returned from server: {subscription_type}")
            billing_date = current_date

        # Insert new tuple into Member table (using account_id as member_id)
        cursor.execute("INSERT INTO member (member_id, first_name, last_name, age, date_of_birth, height, weight, next_pay_date, subscription_id) "
                       "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (account_id, member['first_name'], member['last_name'], member['age'], member['date_of_birth'],
                        member['street_name'], member['height'], member['weight'], billing_date, member['subscription_id']))
        # Commit changes
        db_conn.commit()
        # Return response as OK
        return Response(status=200)
    except (PostgresError, Exception) as queryErr:
        print(f"[QUERY ERROR] {queryErr}")
        # Return response as INTERNAL SERVER ERROR
        return Response(status=500)


# Main method
if __name__ == '__main__':
    # Run backend server on port 5000 (React app is running on 3000)
    app.run(port=4000, debug=True, use_reloader=False)
