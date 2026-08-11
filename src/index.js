import 'dotenv/config';

// == DB SETUP ==
import { createTables } from './db/queries.js';
import { pool } from "./db/db.js";

// Create the tables if they don't exist
await createTables();

import express from 'express';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';

const app = express();

const ENVIRONMENT = process.env.ENVIRONMENT

// == SESSION & COOKIE SETUP ==
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({}, pool);

app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: ENVIRONMENT === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

// == MIDDLEWARE IMPORTS ==
import {requireAuth} from "./middleware/auth.js";

// == Serving & Middleware ==
app.use(express.static('src/public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/profile", requireAuth)

// == Import routers from router index ==
import routers from "./routers/index.js";
app.use("/", routers)

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
    if (ENVIRONMENT === "dev") {
        console.log(`LINK: http://localhost:${PORT}/`)
    }
});