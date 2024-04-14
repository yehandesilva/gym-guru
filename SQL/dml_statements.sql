/* Add monthly and annual subscription plans */
INSERT INTO subscription (amount, name, type) VALUES (30.00, 'Fit Flex', 'Monthly');
INSERT INTO subscription (amount, name, type) VALUES (200.00, 'Fit Elite', 'Annual');

/* TRAINERS */

/* Create accounts for trainers */
INSERT INTO account (username, password, type) VALUES ('david10', 'david123', 'trainer');
INSERT INTO account (username, password, type) VALUES ('mark85', 'mark1234', 'trainer');
INSERT INTO account (username, password, type) VALUES ('jen45', 'jennifer1234', 'trainer');
INSERT INTO account (username, password, type) VALUES ('carmela75', 'carmela1234', 'trainer');

/* Create Trainers using their account_id from insertions above */
INSERT INTO trainer (trainer_id, first_name, last_name, rating) VALUES (1, 'David', 'Smith', 5);
INSERT INTO trainer (trainer_id, first_name, last_name, rating) VALUES (2, 'Mark', 'Doe', 2);
INSERT INTO trainer (trainer_id, first_name, last_name, rating) VALUES (3, 'Jen', 'Watkins', 4);
INSERT INTO trainer (trainer_id, first_name, last_name, rating) VALUES (4, 'Carmela', 'Hernandez', 3);

/* Create availabilities for each trainer */
/* David: Monday and Wednesday */
INSERT INTO availability (trainer_id, day) VALUES (1, 'Monday');
INSERT INTO availability (trainer_id, day) VALUES (1, 'Wednesday');
/* Mark: Tuesday and Thursday */
INSERT INTO availability (trainer_id, day) VALUES (2, 'Tuesday');
INSERT INTO availability (trainer_id, day) VALUES (2, 'Thursday');
/* Jennifer: Monday and Friday */
INSERT INTO availability (trainer_id, day) VALUES (3, 'Tuesday');
INSERT INTO availability (trainer_id, day) VALUES (3, 'Thursday');
/* Mary: Saturday and Sunday */
INSERT INTO availability (trainer_id, day) VALUES (2, 'Saturday');
INSERT INTO availability (trainer_id, day) VALUES (2, 'Sunday');

/* Add skills */
INSERT INTO skill (name) VALUES ('Cardio');
INSERT INTO skill (name) VALUES ('Legs');
INSERT INTO skill (name) VALUES ('Chest');
INSERT INTO skill (name) VALUES ('Core');
INSERT INTO skill (name) VALUES ('Lifting');
INSERT INTO skill (name) VALUES ('Yoga');

/* Add specialization for each trainer */
/* David: Specializes in Cardio and Legs */
INSERT INTO specialization (trainer_id, skill_id) VALUES (1, 1);
INSERT INTO specialization (trainer_id, skill_id) VALUES (1, 2);
/* Mark: Specializes in Chest and Core */
INSERT INTO specialization (trainer_id, skill_id) VALUES (2, 3);
INSERT INTO specialization (trainer_id, skill_id) VALUES (2, 4);
/* Jennifer: Specializes in Lifting and Cardio */
INSERT INTO specialization (trainer_id, skill_id) VALUES (3, 5);
INSERT INTO specialization (trainer_id, skill_id) VALUES (3, 1);
/* Mary: Specializes in Core and Yoga */
INSERT INTO specialization (trainer_id, skill_id) VALUES (4, 4);
INSERT INTO specialization (trainer_id, skill_id) VALUES (4, 6);

/* Create rooms */
INSERT INTO room (type) VALUES ('Weight room');
INSERT INTO room (type) VALUES ('Yoga room');
INSERT INTO room (type) VALUES ('Cardio room');

/* Create fitness classes */
/* David has a cardio group fitness class */
INSERT INTO fitness_class (trainer_id, room_id, type, class_date)
VALUES (1, 3, 'Cardio', '2024-04-15');
/* Mark has a Chest group fitness class */
INSERT INTO fitness_class (trainer_id, room_id, type, class_date)
VALUES (2, 3, 'Chest', '2024-04-16');
/* Jennifer has a Lifting group fitness class */
INSERT INTO fitness_class (trainer_id, room_id, type, class_date)
VALUES (3, 1, 'Lifting', '2024-04-17');
/* Mary has a yoga group fitness class */
INSERT INTO fitness_class (trainer_id, room_id, type, class_date)
VALUES (4, 2, 'Yoga', '2024-04-17');


/* MEMBERS (NOTE: CREATING A MEMBER IS OPTIONAL AS MEMBERS CAN BE CREATED VIA THE REGISTRATION FORM)*/

/* Create accounts for members */
INSERT INTO account (username, password, type) VALUES ('george25', 'george1234', 'member');
INSERT INTO account (username, password, type) VALUES ('emma15', 'emma1234', 'member');
INSERT INTO account (username, password, type) VALUES ('daniel90', 'daniel1234', 'member');

/* Create Members using their account_id from insertions above */
INSERT INTO member (member_id, first_name, last_name, email, date_of_birth, height, weight, next_pay_date, subscription_id, card_number)
VALUES (1, 'George', 'Davidson', 'george@email.com', '1990-01-25', 175.5, 65.2, '2024-05-13', 1, '12345678');

INSERT INTO member (member_id, first_name, last_name, email, date_of_birth, height, weight, next_pay_date, subscription_id, card_number)
VALUES (2, 'Emma', 'McDaniels', 'emma@email.com', '1995-04-14', 175.5, 70.7, '2024-05-13', 1, '12345678');

INSERT INTO member (member_id, first_name, last_name, email, date_of_birth, height, weight, next_pay_date, subscription_id, card_number)
VALUES (3, 'Daniel', 'Lowry', 'daniel@email.com', '2000-04-14', 142.6, 55.0, '2025-04-13', 2, '12345678');

/* Create interests for members */
/* George */
INSERT INTO interest (member_id, skill_id) VALUES (1, 1);
INSERT INTO interest (member_id, skill_id) VALUES (1, 5);
/* Emma */
INSERT INTO interest (member_id, skill_id) VALUES (2, 1);
INSERT INTO interest (member_id, skill_id) VALUES (2, 5);
INSERT INTO interest (member_id, skill_id) VALUES (2, 6);
/* Daniel */
INSERT INTO interest (member_id, skill_id) VALUES (1, 1);
INSERT INTO interest (member_id, skill_id) VALUES (1, 3);
INSERT INTO interest (member_id, skill_id) VALUES (1, 4);

/* Create fitness goals for members */
/* George */
INSERT INTO fitness_goal (member_id, name, end_date, target_goal, current_value, completed)
VALUES (1, 'Burn calories', '2024-05-13', 200.0, 0.0, 'false');
/* Emma */
INSERT INTO fitness_goal (member_id, name, end_date, target_goal, current_value, completed)
VALUES (2, 'Cardio (steps)', '2024-05-13', 1500.0, 1500.0, 'true');
/* Daniel */
INSERT INTO fitness_goal (member_id, name, end_date, target_goal, current_value, completed)
VALUES (3, 'Lose weight', '2024-07-10', 5.5, 0.5, 'false');

/* Add members to fitness classes */
/* George */
INSERT INTO fitness_class_member (fitness_class_id, member_id) VALUES (1, 1);
INSERT INTO fitness_class_member (fitness_class_id, member_id) VALUES (4, 1);
/* Emma */
INSERT INTO fitness_class_member (fitness_class_id, member_id) VALUES (2, 2);
/* Daniel */
INSERT INTO fitness_class_member (fitness_class_id, member_id) VALUES (3, 3);

/* Book sessions for members */
/* George */
INSERT INTO session (member_id, trainer_id, day) VALUES (1, 3, '2024-05-16');
/* Emma */
INSERT INTO session (member_id, trainer_id, day) VALUES (2, 3, '2024-05-12');
/* Daniel */
INSERT INTO session (member_id, trainer_id, day) VALUES (3, 3, '2024-05-10');
INSERT INTO session (member_id, trainer_id, day) VALUES (3, 4, '2024-05-12');
