import React, { useState, useContext, useEffect } from "react";
import Nav from "../component/Nav";
import SideBar from "../component/SideBar";
import upload from "../assets/upload.png";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import axios from "axios";

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { adminData, getAdmin, isCheckingAuth } = useContext(adminDataContext);

  // Check admin authentication on component mount
  useEffect(() => {
    console.log("Admin data:", adminData);
    console.log("Is checking auth:", isCheckingAuth);

    // Only show error if we're not currently checking authentication and admin data is null
    if (!isCheckingAuth && !adminData) {
      setError("Admin authentication required. Please login again.");
    } else if (adminData) {
      setError(""); // Clear error if admin is authenticated
    }
  }, [adminData, isCheckingAuth]);

  // Convert image file to Base64 with compression
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Set canvas dimensions (max 800px width/height to reduce size)
        const maxSize = 800;
        let { width, height } = img;

        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8); // 80% quality
        resolve(compressedDataUrl);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    if (file) {
      const base64 = await toBase64(file);
      const newPreviews = [...imagePreviews];
      newPreviews[index] = base64;
      setImagePreviews(newPreviews);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Check admin authentication before proceeding
      if (!adminData) {
        console.log("No admin data, attempting to refresh authentication...");
        try {
          await getAdmin();
        } catch (authError) {
          setError("Admin authentication expired. Please login again.");
          return;
        }
      }
      // Validate required fields
      if (!name.trim()) {
        setError("Product name is required");
        return;
      }
      if (!description.trim()) {
        setError("Product description is required");
        return;
      }
      if (!price || price <= 0) {
        setError("Valid price is required");
        return;
      }
      if (sizes.length === 0) {
        setError("At least one size must be selected");
        return;
      }
      if (!images[0]) {
        setError("At least one image is required");
        return;
      }

      // Convert all selected images to Base64
      const imageData = await Promise.all(
        images.map((img) => (img ? toBase64(img) : null))
      );

      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        subCategory,
        bestseller,
        sizes,
        images: imageData.filter(Boolean), // only include non-null images
      };

      console.log("Sending payload:", payload);
      console.log("Server URL:", serverUrl);

      const result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product added successfully:", result.data);

      if (result.data && result.data._id) {
        setSuccess("Product added successfully!");

        // Reset form
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setImagePreviews([null, null, null, null]);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);

      // Handle authentication errors specifically
      if (error.response?.status === 401) {
        setError(
          "Admin authentication expired. Please refresh the page and login again."
        );
        // Clear admin data to trigger re-authentication
        if (getAdmin) {
          try {
            await getAdmin();
          } catch (authError) {
            console.log("Authentication refresh failed");
          }
        }
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to add product. Please check your connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative overflow-y-auto">
      <Nav />
      <SideBar />
      <div className="w-[82%] flex items-start justify-start absolute right-0">
        <form
          onSubmit={handleAddProduct}
          className="w-[100%] md:w-[90%] mt-[20px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px] pb-[50px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white font-bold">
            Add Product Page
          </div>

          {/* Error and Success Messages */}
          {isCheckingAuth && (
            <div className="bg-blue-500/20 border border-blue-500 rounded-lg px-4 py-2 max-w-[600px]">
              <p className="text-blue-300 text-sm">
                Checking authentication...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg px-4 py-2 max-w-[600px]">
              <p className="text-red-300 text-sm">{error}</p>
              {error.includes("authentication") && (
                <button
                  onClick={async () => {
                    setError("");
                    try {
                      await getAdmin();
                    } catch (authError) {
                      setError("Authentication failed. Please login again.");
                    }
                  }}
                  className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  Refresh Authentication
                </button>
              )}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 rounded-lg px-4 py-2 max-w-[600px]">
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          {/* Upload Images */}
          <div className="w-[80%] flex flex-col mt-[20px] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Upload Images
            </p>
            <div className="flex gap-5 flex-wrap">
              {images.map((img, index) => (
                <React.Fragment key={index}>
                  <label
                    htmlFor={`image${index}`}
                    className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-dashed border-gray-400 hover:border-[#46d1f7] flex items-center justify-center rounded shadow-2xl"
                  >
                    <img
                      src={imagePreviews[index] || upload}
                      alt="preview"
                      className="w-[80%] h-[80%] object-contain rounded"
                    />
                  </label>
                  <input
                    type="file"
                    id={`image${index}`}
                    className="hidden"
                    accept="image/*"
                    required={index === 0}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Name
            </p>
            <input
              type="text"
              placeholder="Type here"
              required
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Product Description */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Description
            </p>
            <textarea
              placeholder="Type here"
              required
              className="w-[600px] max-w-[98%] h-[100px] py-[10px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Category, SubCategory, Price, Sizes, Bestseller */}
          <div className="w-[80%] flex gap-[40px]">
            <div className="w-[100%] md:w-[50%] flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Product Category
              </p>
              <select
                required
                className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="w-[100%] md:w-[50%] flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Sub-Category
              </p>
              <select
                required
                className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Price
            </p>
            <input
              type="number"
              placeholder="₹2000"
              required
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Size
            </p>
            <div className="flex items-center gap-[15px] flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${
                    sizes.includes(size)
                      ? "bg-green-200 text-black border-[#46d1f7]"
                      : ""
                  }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="w-[80%] flex items-center gap-[10px]">
            <input
              type="checkbox"
              id="checkbox"
              className="w-[25px] h-[25px] cursor-pointer"
              onChange={() => setBestSeller((prev) => !prev)}
            />
            <label
              htmlFor="checkbox"
              className="text-[18px] md:text-[22px] font-semibold"
            >
              Add to BestSeller
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-[200px] text-black font-semibold px-[20px] py-[10px] rounded-lg ${
              loading
                ? "bg-gray-600 cursor-not-allowed text-white"
                : "bg-[#46d1f7] hover:bg-[#38bde5] cursor-pointer"
            }`}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
