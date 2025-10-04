import jwt from "jsonwebtoken";

export const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("Token generation error:", error.message);
    throw error;
  }
};


export const genToken1 = (email) => {
  try {
    const token = jwt.sign(
      { email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("Token generation error:", error.message);
    throw error;
  }
};