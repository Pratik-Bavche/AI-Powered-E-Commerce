import jwt from "jsonwebtoken"



const isAuth=async (req,res,next) => {
    try {
        let {userToken}=req.cookies;
        if(!userToken)
        {
            return res.status(400).json({message:"user does not have token"})
        }
        let verifyToken=jwt.verify(userToken,process.env.JWT_SECRET);

        if(!verifyToken)
        {
                return res.status(400).json({message:"user does not have valid token"})
        }

        req.userId=verifyToken.userId   
        next()

    } catch (error) {
         console.error("isAuth error:", error);
    return res.status(500).json({ message: `isAuth error ${error.message}` });
    }
}

export default isAuth;