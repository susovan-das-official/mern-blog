import express, { Router } from "express";
import { Login, Register } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);

export default router;
