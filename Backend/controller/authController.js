import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";

// Detect production environment to set cookie options for cross-site cookies
const isProd = process.env.NODE_ENV === 'production';

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Registration request body:', { name, email });

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
  console.log('User created:', { id: user._id, email: user.email });

    // generate token
    const token = genToken(user._id);

    // store in cookie
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: isProd, // secure cookies in production (HTTPS)
      sameSite: isProd ? 'None' : 'Lax', // allow cross-site cookie in production when needed
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
    console.log('**USER LOGIN** attempt for:', { email });

    const user = await User.findOne({ email });
    if (!user) {
      console.log('**USER LOGIN** User not found in database');
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // add await
    if (!isMatch) {
      console.log('**USER LOGIN** Incorrect password for user:', { email });
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = genToken(user._id);

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('**USER LOGIN** successful for user:', { id: user._id, email: user.email });
    return res.status(200).json({ user });
  } catch (error) {
    console.error("**USER LOGIN** error", error);
    return res.status(500).json({ message: `Login error ${error.message}` });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax'
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: `Logout error ${error.message}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    console.log('Google login request:', { name, email });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    
    const token = genToken(user._id);
  console.log('Google login - issuing token for user:', { id: user._id });

   
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Google login error:", error);
    return res
      .status(500)
      .json({ message: `Google login error ${error.message}` });
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("**ADMIN LOGIN** attempt:", { email, receivedPassword: password ? "***" : "MISSING" });
    console.log("**ADMIN LOGIN** env values - ADMIN_EMAIL:", process.env.ADMIN_EMAIL, "ADMIN_PASS:", process.env.ADMIN_PASS ? "***" : "MISSING");
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      const token = genToken1(email);
      console.log("**ADMIN LOGIN** credentials MATCHED, issuing token");
      
      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'None' : 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days to match JWT expiration
      });
      console.log("**ADMIN LOGIN** token cookie set, returning token");
      return res.status(200).json({ token }); // return object
    }
    console.log("**ADMIN LOGIN** credentials DO NOT MATCH - email match:", email === process.env.ADMIN_EMAIL, "password match:", password === process.env.ADMIN_PASS);
    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("**ADMIN LOGIN** error:", error);
    return res.status(500).json({ message: `Admin login error ${error.message}` });
  }
};