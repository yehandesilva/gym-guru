"""
Backend server for Gym Guru.

@author Pathum Danthanarayana, 101181411
@date April 11, 2024
"""
from flask import Flask
from flask import jsonify
from flask import request
import psycopg2
from psycopg2 import Error as PostgresError

# Create Flask app
app = Flask(__name__)

# Establish connection to the database
try:
    # NOTE: Change user, password, and port based on what port number based on your PostgreSQL configurations
    db_conn = psycopg2.connect(database='GymGuru',
                               user='postgres',
                               password='postgres',
                               host='localhost',
                               port=5432)
    print("[CONNECTION] SUCCESS: Backend server established connection to the Gym Guru database")
except (PostgresError, Exception) as err:
    print("[CONNECTION] ERROR: Connection to the Gym Guru database failed: " + err)
    exit()

# FUNCTIONS FOR PERFORMING SQL QUERIES

"""
Returns info for all the different subscription models
available.
"""


@app.route('/get_subscription_models', methods=['GET'])
def get_subscription_models():
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM subscription")
        subscription_models = cursor.fetchall()
        print(f"[QUERY] Subscription models: {subscription_models}")
        # Return all subscription models as JSON to front-end
        return jsonify(subscription_models)
    except (PostgresError, Exception) as err:
        print(f"[QUERY ERROR] {err}")


"""
Registers a new member by first creating a new account for them,
and then creating a new entry for them in the Members table.
"""
@app.route('/register_member', methods=['POST'])
def register_member():
    cursor = db_conn.cursor()
    try:
        # Get next account_id value (to be associated with new account being created)
        #TODO: Replace these with request data
        email = "test3@gmail.com"
        password = "testpassword3"
        account_type = "member"
        # member_data = json.loads(request.data)

        # Insert new tuple into Account table, and return its account_id (PK)
        cursor.execute("INSERT INTO account (email, password, type) VALUES (%s, %s, %s) RETURNING account_id",
                       (email, password, account_type))
        account_id = int(cursor.fetchone()[0])
        print(f"[LOG]: New account ID: {account_id}")
        # Commit changes
        db_conn.commit()

        # Insert new tuple into Member table (using account_id as member_id)
        #TODO: Finish insertion into Member table

    except (PostgresError, Exception) as err:
        print(f"[QUERY ERROR] {err}")


# Main method
if __name__ == '__main__':
    # Run backend server on port 5000 (React app is running on 3000)
    app.run(port=5000, debug=True, use_reloader=False)
