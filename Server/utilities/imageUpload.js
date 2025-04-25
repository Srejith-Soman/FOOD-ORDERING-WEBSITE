import cloudinary from "../config/cloudinaryConfig.js"


const uploadToCloudinary = (filePath)=> {
    return new Promise((resolve, reject)=> {
        cloudinary.uploader.upload(
            filePath,
            { folder: 'foods' },
            (error, result)=> {
                if(error) return reject(error)
                    resolve(result.secure_url)
            }
        )
      }
   )
}


export default uploadToCloudinary;