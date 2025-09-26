import React, { useState, useContext } from 'react';
import Nav from '../component/Nav';
import SideBar from '../component/SideBar';
import upload from '../assets/upload.png';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      // Correct axios POST syntax
      const result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formData,
        { withCredentials: true }
      );

      console.log(result.data);

      if (result.data) {
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative overflow-y-auto'>
      <Nav />
      <SideBar />

      <div className='w-[82%] flex items-start justify-start absolute right-0'>
        <form 
          onSubmit={handleAddProduct} 
          className='w-[100%] md:w-[90%] mt-[20px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px] pb-[50px]'
        >
          {/* Page Title */}
          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white font-bold'>
            Add Product Page
          </div>

          {/* Upload Images */}
          <div className='w-[80%] flex flex-col mt-[20px] gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Upload Images</p>
            <div className='flex gap-5 flex-wrap'>
              {images.map((img, index) => (
                <React.Fragment key={index}>
                  <label
                    htmlFor={`image${index}`}
                    className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-dashed border-gray-400 hover:border-[#46d1f7] flex items-center justify-center rounded shadow-2xl'
                  >
                    <img
                      src={img ? URL.createObjectURL(img) : upload}
                      alt="upload preview"
                      className='w-[80%] h-[80%] object-contain rounded'
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
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Name</p>
            <input
              type="text"
              placeholder='Type here'
              required
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Product Description */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>
            <textarea
              placeholder='Type here'
              required
              className='w-[600px] max-w-[98%] h-[100px] py-[10px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
              onChange={(e)=>setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Product Category + Sub Category */}
          <div className='w-[80%] flex gap-[40px]'>
            <div className='w-[100%] md:w-[50%] flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Category</p>
              <select
                required
                className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]' 
                onChange={(e)=>setCategory(e.target.value)} 
                value={category}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className='w-[100%] md:w-[50%] flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Sub-Category</p>
              <select
                required
                className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]' 
                onChange={(e)=>setSubCategory(e.target.value)} 
                value={subCategory}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Price</p>
            <input
              type="number"
              placeholder='₹2000'
              required
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
              onChange={(e)=>setPrice(e.target.value)}
              value={price}
            />
          </div>

          {/* Product Sizes */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>
            <div className='flex items-center gap-[15px] flex-wrap'>
              {["S","M","L","XL","XXL"].map(size => (
                <div
                  key={size}
                  className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${
                    sizes.includes(size) ? "bg-green-200 text-black border-[#46d1f7]" : ""
                  }`}
                  onClick={() =>
                    setSizes(prev =>
                      prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
                    )
                  }
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* BestSeller */}
          <div className='w-[80%] flex items-center gap-[10px]'>
            <input
              type="checkbox"
              id='checkbox'
              className='w-[25px] h-[25px] cursor-pointer'
              onChange={()=>setBestSeller(prev=>!prev)}
            />
            <label htmlFor="checkbox" className='text-[18px] md:text-[22px] font-semibold'>
              Add to BestSeller
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className='w-[200px] bg-[#46d1f7] hover:bg-[#38bde5] text-black font-semibold px-[20px] py-[10px] rounded-lg'
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default Add;
