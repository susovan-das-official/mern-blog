import { ApiError } from "../helpers/handleError.js";
import User from "../models/user.models.js";

export const Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
      return next(
        new ApiError(
          400,
          "All fields are required. Please provide username, email, and password."
        )
      );
    }

    // Check if the user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(
        new ApiError(
          409,
          "An account with this email already exists. Please try logging in."
        )
      );
    }

    // Create the user
    const newUser = await User.create({ username, email, password });

    const user = await User.findById(newUser._id).select("-password");

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.username}. Your account has been successfully created.`,
      user,
    });
  } catch (error) {
    // Return error message
    return next(
      new ApiError(
        500,
        "An unexpected error occurred while creating your account. Please try again later."
      )
    );
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return next(
        new ApiError(400, "Email and password are required for login.")
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(new ApiError(404, "Invalid login credentials."));
    }

    // Verify the password
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      console.log("Incorrect password.");
      return next(new ApiError(401, "Invalid login credentials."));
    }

    // Generate JWT and set cookie
    const token = await existingUser.generateJWT();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    };
    res.cookie("token", token, cookieOptions);

    const user = await User.findById(existingUser._id).select("-password");

    // Success response
    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.username}.`,
      user,
    });
  } catch (error) {
    // Log the error and return a generic message
    console.error(error);
    return next(
      new ApiError(
        500,
        "An unexpected error occurred while logging you in. Please try again later."
      )
    );
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    const { username, email, avatar } = req.body;
    let user;

    // Check if user exists
    user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        username,
        email,
        avatar,
      });
    }

    // Generate JWT
    const token = await user.generateJWT();

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    };

    // Set token in cookie
    res.cookie("token", token, cookieOptions);

    // Exclude sensitive fields before responding
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };

    // Success response
    res.status(200).json({
      success: true,
      message: `Welcome, ${user.username}.`,
      user: userResponse,
    });
  } catch (error) {
    // Log the error and return a generic message
    console.error("Google Login Error:", error);
    return next(
      new ApiError(
        500,
        "An unexpected error occurred while logging you in. Please try again later."
      )
    );
  }
};
