import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await User.findByIdAndUpdate(req.userId, { cartData });
        return res.status(201).json({ message: "Added to cart" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "AddToCart Error" });
    }
};


export const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};
        if (!cartData[itemId]) cartData[itemId] = {};
        
        if (quantity <= 0) {
            // Remove the size from cart if quantity is 0 or less
            delete cartData[itemId][size];
            // If no sizes left for this item, remove the entire item
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }

        await User.findByIdAndUpdate(req.userId, { cartData });
        return res.status(201).json({ message: "Cart updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "UpdateCart Error" });
    }
};


export const getUserCart = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};
        return res.status(200).json(cartData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "getUserCart Error" });
    }
};