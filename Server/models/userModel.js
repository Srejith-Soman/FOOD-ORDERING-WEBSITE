import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRI1tUxcvmYS-IZNWXVG5FRq3jbcND8WPV7w&s",
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    foods: [{ type: mongoose.Types.ObjectId, ref: "Food" }],
});
const User = mongoose.model("User", userSchema);

export default User;
