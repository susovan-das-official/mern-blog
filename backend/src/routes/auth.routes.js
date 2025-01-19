import express, { Router } from "express";
import { GoogleLogin, Login, Register } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/google-login").post(GoogleLogin);

export default router;
