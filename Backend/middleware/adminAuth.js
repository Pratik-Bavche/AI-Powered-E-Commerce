import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { adminToken } = req.cookies;
    if (!adminToken) return res.status(401).json({ message: "Not authorized" });

    const verified = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (!verified) return res.status(401).json({ message: "Invalid token" });

    // Check if the token belongs to admin
    if (verified.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Not authorized - Admin access required" });
    }

    req.adminEmail = verified.email;
    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    return res.status(500).json({ message: `adminAuth error ${error.message}` });
  }
};

export default adminAuth;