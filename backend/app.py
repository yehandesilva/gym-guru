"""
Backend server for Gym Guru.

@author Pathum Danthanarayana, 101181411
@date April 11, 2024
"""
from flask import Flask
from flask import jsonify
import json
import psycopg2
from psycopg2 import Error as PostgresError

# FUNCTIONS FOR PERFORMING SQL QUERIES
"""
Returns info for all the different subscription models
available.
"""
def get_subscription_models():
    with db_conn.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM subscription")
            subscription_models = cursor.fetchall()
            print(f"[QUERY] Subscription models: {subscription_models}")
            return subscription_models
        except (PostgresError, Exception) as err:
            print(f"[QUERY ERROR] {err}")


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

# Main method
if __name__ == '__main__':
    # Run backend server on port 5000 (React app is running on 3000)
    app.run(port=5000, debug=True)
