import express from "express";
import { login } from "../../Controllers/auth.controllers/authorization.controllers.js";

const authorizationRouter = express.Router();
authorizationRouter.post('/auth', login)

export default authorizationRouter;