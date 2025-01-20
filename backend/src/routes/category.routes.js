import express, { Router } from "express";
import {
  addCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/add-category").post(addCategory);
router.route("/all-category").get(getAllCategory);
router
  .route("/:categoryId")
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(deleteCategoryById);


export default router;
