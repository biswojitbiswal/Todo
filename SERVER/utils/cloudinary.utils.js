// import {v2 as cloudinary} from 'cloudinary'
// import fs from 'fs'

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

// const uploadCloudinary = async(localFilePath) => {
//     try {
//         if(!localFilePath){
//             return null;
//         }

//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type: "auto"
//         })

//         fs.unlinkSync(localFilePath);
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath)
//         return null;
//     }
// }

// export {uploadCloudinary}


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const downloadImage = async (url, filepath) => {
  const writer = fs.createWriteStream(filepath);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const uploadCloudinary = async (filePathOrUrl) => {
  let localFilePath = filePathOrUrl;
  const isUrl = filePathOrUrl.startsWith('http');

  if (isUrl) {
    localFilePath = path.join('public', 'temp', 'avatar.jpg');
    await downloadImage(filePathOrUrl, localFilePath);
  }

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    if (isUrl && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    if (isUrl && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
};

export { uploadCloudinary };
