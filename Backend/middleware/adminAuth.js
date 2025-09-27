import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).json({ message: "Invalid token" });

    req.adminEmail = process.env.ADMIN_EMAIL;
    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    return res.status(500).json({ message: `adminAuth error ${error.message}` });
  }
};

export default adminAuth;
