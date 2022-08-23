const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const s3 = require("../s3");
const { uploader } = require("./middleware.js");

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/register.json", (req, res) => {
    console.log("req.body hier is:", req.body);
    const { first, last, email, password } = req.body;
    db.hashPassword(password).then(
        db
            .insertUser(first, last, email, password)
            .then((result) => {
                // console.log(
                //     "--------------------------------------------------->result.rows[0]",
                //     result.rows[0]
                // );
                req.session.userId = result.rows[0].id;
                req.session.first = result.rows[0].first;
                req.session.last = result.rows[0].last;
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("err in insertUser hier is:", err);
                res.json({ success: false });
            })
    );
});

// --------------------------------------------------------------------------------------------------------------post log in:
app.post("/login.json", (req, res) => {
    console.log("req.body hier is:", req.body);
    const { email, password } = req.body;
    db.authenticate(email, password)
        .then((result) => {
            console.log(
                "_________________________________________________result:",
                result
            );
            req.session.userId = result.id;
            req.session.first = result.first;
            req.session.last = result.last;
            res.json({ success: true });
        })
        .catch((err) => {
            console.log(
                "______________________________________________________________err in authenticate hier is:",
                err
            );
            res.json({ success: false });
        });
});

// --------------------------------------------------------------------------------------------------------------post log out:

app.post("/logout.json", (req, res) => {
    req.session = null;

    res.json({
        success: req.session,
    });
});

// --------------------------------------------------------------------------------------------------------------post Resetpassword:
app.post("/Resetpassword.json", (req, res) => {
    console.log("req.body hier is:", req.body);
    const { email } = req.body;
    db.findUser(email)
        .then((result) => {
            if (!result.rows[0]) {
                res.json({
                    success: false,
                    message: "The Email does not exit.",
                });
            }
        })
        .catch();
});
// --------------------------------------------------------------------------------------------------------------post Uploader:

app.post(
    "/upload.json",
    uploader.single("photo"),
    s3.upload,
    function (req, res) {
        console.log(
            "/upload is reached",
            req.file,
            "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
        );
        const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

        if (req.file) {
            db.uploadImages(url, req.session.userId).then((result) => {
                console.log("_______________________________", result);
                res.json({ url: result.rows[0].imageurl });
            });
        } else {
            res.json({
                success: false,
                status: "Please try again",
            });
        }
    }
);
// --------------------------------------------------------------------------------------------------------------get profilePic:

app.get("/profilepic", function (req, res) {
    console.log("get profilepic works", req.session.userId);
    db.getUserInfo(req.session.userId)
        .then((result) => {
            if (result.rowCount > 0) {
                // console.log(
                //     "=================================================>result result result",
                //     result
                // );
                res.json({
                    imageUrl: result.rows[0].imageurl,
                    userId: result.rows[0].id,
                    first: result.rows[0].first,
                    last: result.rows[0].last,
                    bio: result.rows[0].bio,
                    success: true,
                });
            }
        })
        .catch((err) => {
            console.log("err from profilepic is:", err);
            res.json({
                success: false,
            });
        });
});
//make db query to get the profpic url and first, last from the users table where the id is
// --------------------------------------------------------------------------------------------------------------get user/id.json:
app.get("/user/id.json", function (req, res) {
    // console.log(
    //     "-------------------------------------------------------------------->res in user/id.json is:",
    //     res
    // );

    res.json({
        userId: req.session.userId,
        first: req.session.first,
        last: req.session.last,
    });
});

// --------------------------------------------------------------------------------------------------------------post /bio.json:
app.post("/bio.json", function (req, res) {
    console.log("/bio.json is reached and the req is:", req.body);
    if (req.body) {
        db.uploadBio(req.body.bioText, req.session.userId).then((result) => {
            console.log("_______________________________", result);
            res.json({
                bioText: result.rows[0].bio,
            });
        });
    } else {
        res.json({
            success: false,
            status: "Please try again",
        });
    }
});

// --------------------------------------------------------------------------------------------------------------get /findPeople.json:
app.get("/findPeople.json", function (req, res) {
    console.log(req.query);
    console.log("/findPeople is reached");
    db.getTop3(req.query).then((result) => {
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> result.rows of getTop3 is:",
            [...result.rows]
        );

        res.json({
            response: result.rows,
        });
    });
});

app.get("/findPeople.json/:search", function (req, res) {
    console.log(req.params.search);
    console.log("/findPeople is reached");
    db.getSearch3(req.params.search).then((result) => {
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> result.rows of getTop3 is:",
            [...result.rows]
        );

        res.json({
            response: result.rows,
        });
    });
});

// --------------------------------------------------------------------------------------------------------------get /api/user/:id.json:
app.get("/api/user/:userId", function (req, res) {
    console.log(
        "get /user/:userId works and the req.params.userId hier is:",
        req.params.userId
    );
    db.getUserInfo(req.params.userId)
        .then((result) => {
            if (result.rowCount > 0) {
                // console.log(
                //     "=================================================>result result result",
                //     result
                // );
                res.json({
                    imageUrl: result.rows[0].imageurl,
                    userId: result.rows[0].id,
                    first: result.rows[0].first,
                    last: result.rows[0].last,
                    bio: result.rows[0].bio,
                    success: true,
                });
            }
        })
        .catch((err) => {
            console.log("err from /user/:userId is:", err);
            res.json({
                success: false,
            });
        });
});

// --------------------------------------------------------------------------------------------------------------get /friendship.json:
app.get("/friendship.json/:userId", function (req, res) {
    console.log(
        "<<<<<<req.session.userId:",
        req.session.userId,
        ">>>>>>req.params.userId:",
        req.params.userId
    );
    db.findFriendship(req.session.userId, req.params.userId).then((result) => {
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk result:", result);
        res.json(result.rows[0]);
    });
});

// --------------------------------------------------------------------------------------------------------------post /requestFriendship.json:
app.post("/requestFriendship.json/:userId", function (req, res) {
    console.log(
        "<<<<<<req.session.userId:",
        req.session.userId,
        ">>>>>>req.params.userId:",
        req.params.userId
    );
    db.requestFriendshipDb(req.session.userId, req.params.userId).then(
        (result) => {
            // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh result:", result);
            res.json({
                id: result.rows[0].id,
                accepted: result.rows[0].accepted,
                sender_id: result.rows[0].sender_id,
                recipient_id: result.rows[0].recipient_id,
            });
        }
    );
});

// --------------------------------------------------------------------------------------------------------------post /cancelFriendship.json:

app.post("/cancelFriendship.json/:userId", function (req, res) {
    console.log(
        "<<<<<<req.session.userId:",
        req.session.userId,
        ">>>>>>req.params.userId:",
        req.params.userId
    );
    db.cancelFriendshipDb(req.session.userId, req.params.userId).then(
        (result) => {
            res.json({
                id: null,
            });
        }
    );
});

// --------------------------------------------------------------------------------------------------------------post /acceptFriendship.json:

app.post("/acceptFriendship.json/:userId", function (req, res) {
    console.log(
        "<<<<<<req.session.userId:",
        req.session.userId,
        ">>>>>>req.params.userId:",
        req.params.userId
    );
    db.acceptFriendshipDb(req.session.userId, req.params.userId).then(
        (result) => {
            console.log("👍👍👍👍👍👍👍", result.rows[0]);
            res.json({
                id: result.rows[0].id,
                accepted: result.rows[0].accepted,
                sender_id: result.rows[0].sender_id,
                recipient_id: result.rows[0].recipient_id,
            });
        }
    );
});

// --------------------------------------------------------------------------------------------------------------
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
