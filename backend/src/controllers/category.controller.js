import { ApiError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";

/**
 * Add a new category
 */
export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    // Validate required fields
    if (!name || !slug) {
      return next(new ApiError(400, "Name and slug are required."));
    }

    // Check for duplicate category by slug
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return next(
        new ApiError(409, "A category with this slug already exists.")
      );
    }

    // Create the new category
    const category = await Category.create({ name, slug });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category,
    });
  } catch (error) {
    return next(new ApiError(500, "Failed to create the category."));
  }
};

/**
 * Get a category by its ID
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return next(new ApiError(400, "Category ID is required."));
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return next(new ApiError(404, "Category not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully.",
      data: category,
    });
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch the category."));
  }
};

/**
 * Update a category by its ID
 */
export const updateCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, slug } = req.body;

    // Validate input fields
    if (!categoryId) {
      return next(new ApiError(400, "Category ID is required."));
    }
    if (!name || !slug) {
      return next(new ApiError(400, "Name and slug are required."));
    }

    // Check for duplicate slug
    const duplicateCategory = await Category.findOne({ slug });
    if (duplicateCategory) {
      return next(
        new ApiError(409, "A category with this slug already exists.")
      );
    }

    // Update the category
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, slug },
      { new: true }
    );

    if (!updatedCategory) {
      return next(new ApiError(404, "Category not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    return next(new ApiError(500, "Failed to update the category."));
  }
};

/**
 * Delete a category by its ID
 */
export const deleteCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return next(new ApiError(400, "Category ID is required."));
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return next(new ApiError(404, "Category not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    return next(new ApiError(500, "Failed to delete the category."));
  }
};

/**
 * Get all categories
 */
export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully.",
      data: categories,
    });
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch categories."));
  }
};
