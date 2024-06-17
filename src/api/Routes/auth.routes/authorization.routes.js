import express from "express";
import { register, login } from "../../Controllers/auth.controllers/authorization.controllers.js";

const authorizationRouter = express.Router();

authorizationRouter.post('/auth/login', login)
authorizationRouter.post('/auth/register', register)

export default authorizationRouter;