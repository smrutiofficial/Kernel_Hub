// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// require('dotenv').config();

// // Configuration
// cloudinary.config({
//   cloud_name:process.env.CLOUD_NAME,
//   api_key:process.env.API_KEY ,
//   api_secret:process.env.API_SECRET ,
// });

// const uploadoncc = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     console.log("file uploaded sucessfully", response.url);
//     return response;
//   } catch (error) {
//     console.log("something wrong...");
    
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

// export default uploadoncc;