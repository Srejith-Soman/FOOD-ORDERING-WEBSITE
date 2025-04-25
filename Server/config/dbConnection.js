import mongoose from "mongoose";


const connectDB = async()=> {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connected");

    } catch (error) {
        console.error("Error connecting to MongoDB",error);
        res.status(500).json(error)
    }
}

export default connectDB;