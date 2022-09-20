DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS imageship;
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

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    recipient_id INT REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT false
);

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id) ,
    url VARCHAR,
    username VARCHAR,
    title VARCHAR,
    description TEXT,
    likedPeople TEXT
);

CREATE TABLE imageship (
    userId INT,
    url VARCHAR,
    likedPeople TEXT
);