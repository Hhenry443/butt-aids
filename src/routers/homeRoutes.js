// Generic imports
import express from 'express';
import sendPage from "./sendfile.js";

const homeRouter = express.Router();

// Route to display the login page
homeRouter.get('/home', sendPage('home.html'));


export { homeRouter };