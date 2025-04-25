import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

 const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const authToken = authHeader && authHeader.split(" ")[1];
        // if there is no tocken
        if (!authToken) return res.status(400).json({ error: "no auth token" });

        //decording the token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        //checking whether the user is exist or not
        const user = await User.findOne({ _id: decoded.id });
        if (!user) return res.json({ error: "User not Found" })

        req.user = decoded.id;

        next();
    } catch (error) {
        return res.status(error.status || 500).json({ error: "Please Login" })
    }
};

export default authMiddleware;