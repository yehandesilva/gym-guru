/* Create table to store info for different types of subscriptions */
CREATE TABLE IF NOT EXISTS subscription (
    subscription_id SERIAL PRIMARY KEY,
    amount NUMERIC(6,2) NOT NULL,
    name VARCHAR(20) NOT NULL,
    type VARCHAR(20) NOT NULL
);

/* Create table to store account information */
CREATE TABLE IF NOT EXISTS account (
	account_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL
);

/* Create table to store member information */
CREATE TABLE IF NOT EXISTS member (
	member_id INT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
	date_of_birth DATE NOT NULL,
	height NUMERIC(5, 2) NOT NULL,
	weight NUMERIC(5, 2) NOT NULL,
	next_pay_date DATE NOT NULL,
	subscription_id INT NOT NULL,
	card_number VARCHAR(20) NOT NULL,
	FOREIGN KEY (subscription_id)
		REFERENCES subscription (subscription_id)
);

/* Create table to store skills */
CREATE TABLE IF NOT EXISTS skill (
	skill_id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

/* Create table to store members' interests */
CREATE TABLE IF NOT EXISTS interest (
	member_id INT NOT NULL,
	skill_id INT NOT NULL,
	PRIMARY KEY (member_id, skill_id),
	FOREIGN KEY (member_id)
		REFERENCES member (member_id),
	FOREIGN KEY (skill_id)
		REFERENCES skill (skill_id)
);

/* Create table to store members' fitness goals */
CREATE TABLE IF NOT EXISTS fitness_goal (
	fitness_goal_id SERIAL PRIMARY KEY,
	member_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	end_date DATE NOT NULL,
	target_goal NUMERIC(6, 2) NOT NULL,
	current_value NUMERIC(6, 2) NOT NULL,
	completed BOOLEAN NOT NULL,
	FOREIGN KEY (member_id)
		REFERENCES member (member_id)
);

/* Create table to store trainer information */
CREATE TABLE IF NOT EXISTS trainer (
	trainer_id INT PRIMARY KEY,
	first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
	rating INT DEFAULT 0,
	CHECK (rating BETWEEN 0 and 5)
);

/* Create table to store room information */
CREATE TABLE IF NOT EXISTS room (
	room_id SERIAL PRIMARY KEY,
	type VARCHAR(20) NOT NULL
);

/* Create table to store group fitness class information */
CREATE TABLE IF NOT EXISTS fitness_class (
	fitness_class_id SERIAL PRIMARY KEY,
	trainer_id INT NOT NULL,
	room_id INT NOT NULL,
	type VARCHAR(20) NOT NULL,
	class_date DATE NOT NULL,
	FOREIGN KEY (trainer_id)
		REFERENCES trainer (trainer_id),
	FOREIGN KEY (room_id)
		REFERENCES room (room_id)
);

/* Create table to store members in a particular fitness class */
CREATE TABLE IF NOT EXISTS fitness_class_member (
	fitness_class_id INT NOT NULL,
	member_id INT NOT NULL,
	PRIMARY KEY (fitness_class_id, member_id),
	FOREIGN KEY (fitness_class_id)
		REFERENCES fitness_class (fitness_class_id),
	FOREIGN KEY (member_id)
		REFERENCES member (member_id)
);

/* Create table to store sessions information */
CREATE TABLE IF NOT EXISTS session (
	member_id INT NOT NULL,
	trainer_id INT NOT NULL,
	day VARCHAR(20) NOT NULL,
	PRIMARY KEY (member_id, trainer_id, day),
	FOREIGN KEY (member_id)
		REFERENCES member (member_id),
	FOREIGN KEY (trainer_id)
		REFERENCES trainer (trainer_id)
);

/* Create table to store trainer availability */
CREATE TABLE IF NOT EXISTS availability (
	trainer_id INT NOT NULL,
	day VARCHAR(20) NOT NULL,
	PRIMARY KEY (trainer_id, day),
	FOREIGN KEY (trainer_id)
		REFERENCES trainer (trainer_id)
);

/* Create table to store trainer specializations */
CREATE TABLE IF NOT EXISTS specialization (
	trainer_id INT NOT NULL,
	skill_id INT NOT NULL,
	PRIMARY KEY (trainer_id, skill_id),
	FOREIGN KEY (trainer_id)
		REFERENCES trainer (trainer_id),
	FOREIGN KEY (skill_id)
		REFERENCES skill (skill_id)
);
