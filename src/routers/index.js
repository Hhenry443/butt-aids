// This is the main router hub
// When adding a new router, just add it to the import list, then do router.use()
import { Router } from 'express';
// import { loginRouter } from './loginRoutes.js';
import {homeRouter} from './homeRoutes.js';
const router = Router();

// Default / route takes users to the home page
router.get("/", (req, res) => {
    res.redirect("/home")
})

// router.use(loginRouter);
router.use(homeRouter);

export default router;