// Generic imports
import express from 'express';
// import {getUserByName} from "../db/queries.js";
import bcrypt from 'bcrypt';
import sendPage from "./sendfile.js";

const loginRouter = express.Router();

// Route to display the login page
loginRouter.get('/login', sendPage('login.html'));

// Route to log in the user
loginRouter.post("/api/auth/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Get the user by their name to see if it exists
    const user = await getUserByName(username);

    if (!user) {
        console.log("User not found");
        return res.redirect("/login");
    }

    // If user exists, compare the password to the hash
    const passwordMatches = await bcrypt.compare(password, user['password_hash']);
    if (!passwordMatches) {
        console.log("Incorrect password");
        return res.redirect("/login");
    }

    // User logged in
    // setup session using regenerate
    req.session.regenerate((err) => {
        if (err) return res.status(500).send("Something went wrong");
        req.session.userId = user.id_user;
        req.session.role = user.role;
        res.redirect("/profile");
    });
});

loginRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    })
})

export { loginRouter };