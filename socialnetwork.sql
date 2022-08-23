DROP TABLE IF EXISTS users;
CREATE TABLE users (
     id serial PRIMARY KEY,
     first VARCHAR NOT NULL CHECK (first != ''),
     last VARCHAR NOT NULL CHECK (first != ''),
     email VARCHAR (255) UNIQUE NOT NULL,
     password VARCHAR (60) NOT NULL,
     imageurl TEXT, 
     bio TEXT,
     hobbies TEXT
);

DROP TABLE IF EXISTS friendships;
CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    recipient_id INT REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT false
);

