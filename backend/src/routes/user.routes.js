import express, { Router } from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/:userId").get(getUser);
router.route("/:userId").put(upload.single("avatar"), updateUser);
export default router;
