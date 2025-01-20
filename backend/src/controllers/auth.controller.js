import { ApiError } from "../helpers/handleError.js";
import User from "../models/user.models.js";

/**
 * Register a new user
 */
export const Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
      return next(
        new ApiError(
          400,
          "All fields are required: username, email, and password."
        )
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new ApiError(
          409,
          "An account with this email already exists. Please log in."
        )
      );
    }

    // Create the user
    const newUser = await User.create({ username, email, password });

    // Exclude the password in the response
    const user = await User.findById(newUser._id).select("-password");

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.username}. Your account has been created successfully.`,
      data: user,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return next(
      new ApiError(
        500,
        "An error occurred while creating your account. Please try again later."
      )
    );
  }
};

/**
 * Log in a user
 */
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return next(new ApiError(400, "Both email and password are required."));
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(404, "Invalid login credentials."));
    }

    // Verify the password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return next(new ApiError(401, "Invalid login credentials."));
    }

    // Generate JWT and set cookie
    const token = await user.generateJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    // Exclude the password in the response
    const userResponse = await User.findById(user._id).select("-password");

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${userResponse.username}.`,
      data: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    return next(
      new ApiError(
        500,
        "An error occurred while logging you in. Please try again later."
      )
    );
  }
};

/**
 * Log in a user with Google
 */
export const GoogleLogin = async (req, res, next) => {
  try {
    const { username, email, avatar } = req.body;

    let user = await User.findOne({ email });

    // If user doesn't exist, create a new account
    if (!user) {
      user = await User.create({ username, email, avatar });
    }

    // Generate JWT
    const token = await user.generateJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    // Exclude sensitive fields in the response
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };

    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.username}.`,
      data: userResponse,
    });
  } catch (error) {
    console.error("Google login error:", error);
    return next(
      new ApiError(
        500,
        "An error occurred during Google login. Please try again later."
      )
    );
  }
};

/**
 * Log out a user
 */
export const Logout = async (req, res, next) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "You have been logged out successfully.",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return next(
      new ApiError(
        500,
        "An error occurred while logging you out. Please try again later."
      )
    );
  }
};
