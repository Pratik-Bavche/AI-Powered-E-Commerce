import User from "../model/userModel.js"

export const getCurrentUser=async (req,res) => {
    try {
        let user=await User.findById(req.userId).select("-password")
        if(!user)
        {
            return res.status(404).json({message:"user is not found"});
        }
        return res.status(200).json(user)
    } catch (error) {
         console.error(error);
    return res.status(500).json({ message: `get current user error ${error.message}` });
    }
}

export const getAdmin=async (req,res) => {
    try {
        let adminEmail=req.adminEmail;
        if(!adminEmail)
        {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({email:adminEmail,role:"admin"})
    } catch (error) {
         console.error(error);
    return res.status(500).json({ message: `getAdmin error ${error.message}` });
    }
}