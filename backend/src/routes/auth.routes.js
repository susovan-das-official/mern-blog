import express, { Router } from "express";
import { GoogleLogin, Login, Logout, Register } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/google-login").post(GoogleLogin);
router.route("/logout").post(Logout);

export default router;
