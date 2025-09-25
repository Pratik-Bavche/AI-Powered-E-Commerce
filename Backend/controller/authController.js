import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }

    // validate password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters" });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ name, email, password: hashPassword });

    // generate token
    const token = genToken(user._id);

    // store in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Registration error", error);
    return res
      .status(500)
      .json({ message: `Registration error ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare passwords
    const isMatch =bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // generate token
    const token = genToken(user._id);

    // store in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({user});
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ message: `Login error ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "Strict"
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: `Logout error ${error.message}` });
  }
};

export const googleLogin=async (req,res) => {
  try {
    let {name,email}=req.body;
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
     user = await User.create({
      name,email
    })
    }

    // generate token
    const token = genToken(user._id);

    // store in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({user});

  } catch (error) {
     console.error("Goggle login error:", error);
    return res.status(500).json({ message: `Google login error ${error.message}` });
  }
}

export const adminLogin=async (req,res) => {
  try {
    let {email,password}=req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS)
    {
      const token = genToken1(email);
      res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "Strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(token);
    }
     return res.status(400).json({message:"Invalid creadintials"})
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: `Admin login error ${error.message}` });
  }
}