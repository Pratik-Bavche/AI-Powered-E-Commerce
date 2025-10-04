import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },  
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (val) => validator.isEmail(val),
        message: "Invalid email address",
      },
    },
    // The 'password' field is now optional to allow Google sign-ups.
    password: {
      type: String,
      required: false, // Changed from true to false
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, minimize: false }
);

const User = mongoose.model("User", userSchema);
export default User;