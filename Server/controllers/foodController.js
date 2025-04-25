import Foods from "../models/foodModel.js";
import uploadToCloudinary from "../utilities/imageUpload.js";

export const create = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        console.log(req.body, " req.Body");

        if (!title || !description || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (!req.file) {
            return res.status(400).json({ error: "Image not found" });
        }

        const cloudinaryRes = await uploadToCloudinary(req.file.path);
        console.log(cloudinaryRes, " Image uploaded by Cloudinary ");

        const newFood = await Foods({
            title,
            description,
            price,
            image: cloudinaryRes,
        });

        let savedFood = await newFood.save();

        if (savedFood) {
            return res.status(200).json({ message: "Food added", savedFood });
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

export const listFood = async (req, res) => {
    try {
        const foodList = await Foods.find();
        res.status(200).json(foodList);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

export const foodDetails = async (req, res) => {
    try {
        const { foodId } = req.params;
        const foodDetails = await Foods.findById(foodId)

        if(!foodDetails){
            return res.status(400).json({ error : "Food not found"})
        }
        return res.status(200).json(foodDetails)

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

export const updateFood = async (req, res) => {
    try {
        const {foodId} = req.params
        const {title, description, price} = req.body;
        let imageUrl;

        let isFoodExist = await Foods.findById(foodId)
        if(!isFoodExist){
            return res.status(400).json({ error: "Food not found"})
        }
        if(req.file){
            const cloudinaryRes = await uploadToCloudinary(req.file.path)
            imageUrl = cloudinaryRes
        }

        const updatedFood = await Foods.findByIdAndUpdate(foodId, { title, description, price, image : imageUrl}, {new: true})
        res.status(200).json({message : "Food Updated", updatedFood})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}

export const deleteFood = async (req, res) => {
    try {
        const { foodId } = req.params

        const deleteFood = await Foods.findByIdAndDelete(foodId)
        if(!deleteFood){
            return res.status(400).json({ error: "Food not fount"})
        }

        res.status(200).json({message : "Food deleted ",})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}