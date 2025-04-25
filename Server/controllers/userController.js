import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import createToken from "../utilities/generateToken.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        return res.status(201).json({ message: "Account created", savedUser });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { role } = req.query;
        console.log(role," role");
        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userExist = await User.findOne({ email, role });
        if(!userExist){
            return res.status(400).json({ error: "user not found" });
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password)
        console.log(passwordMatch," matchpassword");
        
        if(!passwordMatch){
            return res.status(400).json({ error: "not a vaild password" });
        }

        const userObject = userExist.toObject()
        delete userObject.password

        const token = createToken(userExist._id)

        return res.status(200).json({message: "Login Successfull",userObject ,token})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};
 
export const profile = async (req,res) => {
    try {
        const userId = req.user
        const user = await User.findById(userId).select("-password")
        return res.status(200).json( user )
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}

export const updateUser = async(req,res) => {
    try {
        const userId = req.user
        const updateedUser = await User.findByIdAndUpdate( userId, req.body, {new: true} )
        return res.status(200).json({message : "User Updated", updateedUser })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}

export const deleteUser = async (req,res) => {
    try {
        const { userId } = req.params

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({error: "Invalid Id"})
        }

        await User.findByIdAndDelete(userId)

        return res.status(200).json("User Deleted")
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}