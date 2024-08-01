import express from "express";
import {Login, logOut, Me} from "../controllers/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.get('/me', Me);
AuthRouter.post('/login', Login);
AuthRouter.delete('/logout', logOut);

export default AuthRouter;