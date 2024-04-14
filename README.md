# GymGuru - COMP 3005 Assignment

This project simulates a Health and Fitness app with member and trainer functionality. It is a node.js application using React for the front-end and Python's Flask framework for the backed. Tihs project is meant to be run on a PostgreSQL database.


## Group Members

🏅 Yehan De Silva, 101185388<br>
🏅 Pathum Danthanarayana, 101181411<br>

## Demonstration Video (Youtube)
https://youtu.be/fCZc0yH0v7Q

## How to Run Project
1. Create Database in pgAdmin 4 using the following credentials:
```
database_name = "GymGuru"
user = "postgres"
password = "postgres"
host = "localhost"
port = 5432
```
2. Navigate to gym-guru/backend/app.py and run main program to start backend. Before starting the backend, ensure that all the dependencies listed in backend/requirements.txt have been installed. To do this, the following command can be run (cd into the backend folder first): ```pip3 install -r requirements.txt```
3. Run command ```npm install``` (in project's directory) to install all necessary dependancies
4. Run command ```npm start``` (in project's directory) to start the front end
