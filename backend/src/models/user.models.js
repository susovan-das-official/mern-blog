import mongoose, { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://i.pinimg.com/736x/e7/ba/95/e7ba955b143cda691280e1d0fd23ada6.jpg",
    },
  },
  { timestamps: true }
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcryptjs.hash(this.password, 12);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password correctness
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Instance method to generate JWT
userSchema.methods.generateJWT = async function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRE,
  });
};

const User = model("User", userSchema);
export default User;
