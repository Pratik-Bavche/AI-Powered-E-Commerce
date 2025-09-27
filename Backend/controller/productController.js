import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
    try {
        let { name, description, price, category, subCategory, sizes, bestseller, images } = req.body;

        // Upload base64 images to Cloudinary
        let image1 = null;
        let image2 = null;
        let image3 = null;
        let image4 = null;

        if (images && images.length > 0) {
            console.log(`Received ${images.length} images to upload`);
            console.log('Images data:', images.map((img, i) => `Image ${i + 1}: ${img ? 'Present' : 'Null'}`));
            
            // Upload each base64 image to Cloudinary
            for (let i = 0; i < Math.min(images.length, 4); i++) {
                if (images[i]) {
                    try {
                        console.log(`Uploading image ${i + 1} to Cloudinary...`);
                        const uploadResult = await uploadOnCloudinary(images[i]);
                        console.log(`Image ${i + 1} upload result:`, uploadResult);
                        
                        if (i === 0) image1 = uploadResult;
                        else if (i === 1) image2 = uploadResult;
                        else if (i === 2) image3 = uploadResult;
                        else if (i === 3) image4 = uploadResult;
                        
                        console.log(`Image ${i + 1} uploaded to Cloudinary successfully:`, uploadResult);
                    } catch (uploadError) {
                        console.error(`Error uploading image ${i + 1} to Cloudinary:`, uploadError);
                    }
                } else {
                    console.log(`Image ${i + 1} is null, skipping upload`);
                }
            }
        } else {
            console.log('No images received in request');
        }

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes || "[]"),
            bestSeller: bestseller === "true" || bestseller === true,
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
