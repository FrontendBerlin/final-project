const spicedPg = require("spiced-pg");
const dbUrl =
    process.env.DATABASE_URL || require("../secrets.json").DATABASE_URL;
const db = spicedPg(dbUrl);
const bcrypt = require("bcryptjs");

// _____________________________________________________________________________________________________________________________________Registration

const hashPassword = (password) => {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
};
module.exports.hashPassword = hashPassword;

module.exports.insertUser = (first, last, email, password) => {
    return hashPassword(password).then((hashedPassword) => {
        return db.query(
            `INSERT INTO users(first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id,first,last,email`,
            [first, last, email, hashedPassword]
        );
    });
};
// _____________________________________________________________________________________________________________________________________LogIn
const findUser = (email) => {
    return db.query(`SELECT * FROM users WHERE EMAIL =$1`, [email]);
};

module.exports.findUser = findUser;
module.exports.authenticate = (email, password) => {
    return findUser(email)
        .catch((err) => {
            console.log("err in findUser:", err);
            return;
        })
        .then((foundUser) => {
            // console.log("foundUser:", foundUser);

            return bcrypt
                .compare(password, foundUser.rows[0].password)
                .then((result) => {
                    console.log("result of compare:", result);
                    if (result) {
                        return foundUser.rows[0];
                    } else {
                        return result;
                    }
                })
                .catch((err) => {
                    console.log("err in promise of compare:", err);
                    return;
                });
        })
        .catch((err) => {
            console.log("err in promise of findUser:", err);
            return;
        });
};
// _____________________________________________________________________________________________________________________________________Uploader
module.exports.uploadImages = function (url, id) {
    return db.query(
        `UPDATE users SET imageurl = $1 WHERE id = $2 RETURNING imageurl;`,
        [url, id]
    );
};

// UPDATE cities SET name = 'Munich' WHERE name = 'Munch';
module.exports.getUserInfo = function (userId) {
    return db.query(
        `SELECT id,first,last,imageurl,bio FROM users WHERE id = $1`,
        [userId]
    );
};

module.exports.uploadBio = function (bioText, id) {
    return db.query(
        `UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio,id;`,
        [bioText, id]
    );
};

module.exports.getTop3 = function () {
    return db.query(
        ` SELECT id,first,last,imageurl,bio FROM users ORDER BY id DESC LIMIT 3 ;`
    );
};

module.exports.getSearch3 = function (search) {
    return db.query(
        `SELECT id,first,last,imageurl,bio FROM users WHERE first ILIKE $1 ORDER BY id DESC LIMIT 3 ;`,
        [search + "%"]
    );
};

module.exports.findFriendship = (user1, user2) => {
    const query = `
        SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`;
    return db.query(query, [user1, user2]);
};

module.exports.requestFriendshipDb = (user1, user2) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING id,sender_id, recipient_id, accepted`,
        [user1, user2]
    );
};

module.exports.cancelFriendshipDb = (user1, user2) => {
    return db.query(
        `DELETE FROM friendships WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1) `,
        [user1, user2]
    );
};

module.exports.acceptFriendshipDb = (user1, user2) => {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1) RETURNING accepted`,
        [user1, user2]
    );
};

// `UPDATE users SET imageurl = $1 WHERE id = $2 RETURNING imageurl;`,
// [url, id]

// DELETE FROM cities WHERE country <> 'Germany';

// `INSERT INTO users(first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id,first,last,email`,
//             [first, last, email, hashedPassword]

// id SERIAL PRIMARY KEY,
// sender_id INT REFERENCES users(id) NOT NULL,
// recipient_id INT REFERENCES users(id) NOT NULL,
// accepted BOOLEAN DEFAULT false
// _____________________________________________________________________________________________________________________________________Hobby

module.exports.updateHobby = (hobbies, id) => {
    return db.query(
        `UPDATE users SET hobbies = $1 WHERE id = $2 RETURNING id,hobbies;`,
        [hobbies, id]
    );
};

// _____________________________________________________________________________________________________________________________________SelectFromHobby
module.exports.selectHobbies = () => {
    return db.query(`SELECT * FROM hobbies;`);
};
// _____________________________________________________________________________________________________________________________________InsertHobby
module.exports.insertHobby = (userId, hobby) => {
    console.log("...........", hobby);
    return db.query(
        `INSERT INTO hobby (userId,hobby) VALUES ($1,$2) RETURNING *;`,
        [userId, hobby]
    );
};

// return db.query(
//     `INSERT INTO images
//         (url, username, title, description)
//         VALUES ($1, $2, $3, $4)
//         RETURNING *;`,
//     [url, username, title, description]
//   );
// };
module.exports.findUsersWithHobby = (hobby) => {
    const query = `SELECT id,first,last,imageurl,bio FROM users WHERE hobbies ILIKE $1 ORDER BY id DESC LIMIT 3; `;
    return db.query(query, [`%${hobby}%`]);
};
module.exports.findUsersWithHobbyWithId = (hobby, selectedPeopleId) => {
    const query = `SELECT id,first,last,imageurl,bio FROM users WHERE hobbies ILIKE $1 AND id = ANY($2) ORDER BY id DESC LIMIT 3; `;
    return db.query(query, [`%${hobby}%`, selectedPeopleId]);
};

module.exports.insertImage = (url, description, userId) => {
    return db.query(
        `INSERT INTO images
            (url,description, userId)
            VALUES ($1, $2, $3)
            RETURNING url, description;`,
        [url, description, userId]
    );
};

module.exports.getAlbum = (userId) => {
    return db.query(
        `SELECT url,userId,id FROM images WHERE userId = $1 ORDER BY id DESC LIMIT 5;`,
        [userId]
    );
};

module.exports.deletePicAlbum = (id) => {
    return db.query(`DELETE FROM images WHERE id = $1;`, [id]);
};
// return db.query(
//     `SELECT id,first,last,imageurl,bio FROM users WHERE first ILIKE $1 ORDER BY id DESC LIMIT 3 ;`,
//     [search + "%"]
// );

module.exports.myFriends = (userId) => {
    const query = `(
        SELECT recipient_id FROM friendships
        WHERE accepted = true AND sender_id = $1) UNION ALL (
        SELECT sender_id FROM friendships
        WHERE accepted = true AND recipient_id = $1)
        `;
    return db.query(query, [userId]);
};
module.exports.myRequest = (userId) => {
    const query = `(
        SELECT recipient_id FROM friendships
        WHERE accepted = false AND sender_id = $1) UNION ALL (
        SELECT sender_id FROM friendships
        WHERE accepted = false AND recipient_id = $1)
        `;
    return db.query(query, [userId]);
};
// module.exports.myFriendsFromRecipient = (userId) => {
//     const query = `
//         SELECT sender_id FROM friendships
//         WHERE accepted = true AND recipient_id = $1`;
//     return db.query(query, [userId]);
// };
module.exports.getMyFriends = (friendsId) => {
    const query = `SELECT id,first,last,imageurl,bio FROM users WHERE id = ANY($1)`;
    return db.query(query, [friendsId]);
};
module.exports.getMyRequest = (requestId) => {
    const query = `SELECT id,first,last,imageurl,bio FROM users WHERE id = ANY($1)`;
    return db.query(query, [requestId]);
};

module.exports.insertLikedPeople = (userId, url, likedPeopleId) => {
    return db.query(
        `INSERT INTO imageship (userid,url,likedPeople) VALUES ($1,$2,$3);`,
        [userId, url, likedPeopleId]
    );
};
module.exports.deleteLikedPeople = (userId, url, likedPeopleId) => {
    return db.query(
        `DELETE FROM imageship WHERE userid=$1 AND url=$2 AND likedPeople=$3`,
        [userId, url, likedPeopleId]
    );
};
module.exports.checkFollowersInDb1 = (id) => {
    return db.query(` SELECT url FROM images WHERE id=$1;`, [id]);
};
module.exports.checkFollowersInDb2 = (url) => {
    return db.query(`SELECT likedpeople FROM imageship WHERE url=$1;`, [url]);
};
module.exports.checkFollowersInDb3 = (idList) => {
    return db.query(`SELECT first,last FROM users WHERE id=ANY($1);`, [idList]);
};
// );
// module.exports.deletePicAlbum = (id) => {
//     return db.query(`DELETE FROM images WHERE id = $1;`, [id]);
// };
