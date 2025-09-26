import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
    try {
        let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Upload images to Cloudinary only if files exist
        let image1 = req.files?.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : null;
        let image2 = req.files?.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : null;
        let image3 = req.files?.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : null;
        let image4 = req.files?.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : null;

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true",
            date: Date.now(),
            image1,
            image2,
            image3,
            image4
        };

        const newProduct = await Product.create(productData);

        return res.status(201).json(newProduct);

    } catch (error) {
        console.error("AddProduct error:", error);
        return res.status(500).json({ message: `AddProduct error: ${error.message}` });
    }
};

export const listProduct = async (req, res) => {
    try {
        const product = await Product.find({});
        return res.status(200).json(product);
    } catch (error) {
        console.error("ListProduct error:", error);
        return res.status(500).json({ message: `ListProduct error: ${error.message}` });
    }
};

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json(product);
    } catch (error) {
        console.error("RemoveProduct error:", error);
        return res.status(500).json({ message: `RemoveProduct error: ${error.message}` });
    }
};
