import { uploadOnCloudinary } from "../helpers/cloudinary.js";
import { ApiError } from "../helpers/handleError.js";

import User from "../models/user.models.js";
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return next(new ApiError(404, "User not found."));
    }

    const user = await User.findById(userId).select("-password");

    // Success response
    res.status(200).json({
      success: true,
      message: `User found.`,
      user,
    });
  } catch (error) {
    // Log the error and return a generic message
    return next(
      new ApiError(500, "An unexpected error occurred while fetching the user.")
    );
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, email, bio } = req.body;
    const avatarLocalFilePath = req.file?.path;

    const user = await User.findById(userId);
    console.log(`user`, user);

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    if (avatarLocalFilePath) {
      const avatar = await uploadOnCloudinary(avatarLocalFilePath);
      user.avatar = avatar?.secure_url;
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (bio) {
      user.bio = bio;
    }

    const newUser = await user.save();
    console.log(newUser);

    // Success response
    res.status(200).json({
      success: true,
      message: `User updated successfully.`,
      user: newUser,
    });
  } catch (error) {
    console.error(`Error updating user:`, error);
    return next(
      new ApiError(500, "An error occurred while updating the user.")
    );
  }
};
