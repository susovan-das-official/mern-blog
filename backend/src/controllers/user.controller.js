import { uploadOnCloudinary } from "../helpers/cloudinary.js";
import { ApiError } from "../helpers/handleError.js";
import User from "../models/user.models.js";

/**
 * Get a user by their ID
 */
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return next(
      new ApiError(500, "An unexpected error occurred while fetching the user.")
    );
  }
};

/**
 * Update a user's information
 */
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, email, bio } = req.body;
    const avatarLocalFilePath = req.file?.path;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    // Update the user's avatar if a new file is provided
    if (avatarLocalFilePath) {
      try {
        const avatar = await uploadOnCloudinary(avatarLocalFilePath);
        user.avatar = avatar?.secure_url;
      } catch (cloudinaryError) {
        console.error("Error uploading avatar:", cloudinaryError);
        return next(
          new ApiError(
            500,
            "An error occurred while uploading the avatar. Please try again."
          )
        );
      }
    }

    // Update the user's details if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    // Save the updated user
    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return next(
      new ApiError(500, "An unexpected error occurred while updating the user.")
    );
  }
};
