import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
const uploadOnCloudinary=async (filePathOrBase64) => {
    console.log('Cloudinary config:', {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_APIKEY ? 'Present' : 'Missing',
        api_secret: process.env.CLOUDINARY_APISECRET ? 'Present' : 'Missing'
    });
    
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_APIKEY, 
        api_secret:process.env.CLOUDINARY_APISECRET 
    });
     try {
        if(!filePathOrBase64)
        {
            console.log('No file path or base64 provided');
            return null;
        }
        
        console.log('Uploading to Cloudinary, input type:', filePathOrBase64.startsWith('data:image/') ? 'Base64' : 'File Path');
        
        // Check if it's a base64 string or file path
        if (filePathOrBase64.startsWith('data:image/')) {
            // It's a base64 string
            console.log('Uploading base64 image to Cloudinary...');
            const uploadResult = await cloudinary.uploader.upload(filePathOrBase64)
            console.log('Cloudinary upload successful:', uploadResult.secure_url);
            return uploadResult.secure_url
        } else {
            // It's a file path (for backward compatibility)
            console.log('Uploading file path to Cloudinary...');
            const uploadResult = await cloudinary.uploader.upload(filePathOrBase64)
            fs.unlinkSync(filePathOrBase64)
            console.log('Cloudinary upload successful:', uploadResult.secure_url);
            return uploadResult.secure_url
        }
     } catch (error) {
        if (!filePathOrBase64.startsWith('data:image/')) {
            fs.unlinkSync(filePathOrBase64);
        }
        console.error('Cloudinary upload error:', error);
        throw error;
     }
}

export default uploadOnCloudinary