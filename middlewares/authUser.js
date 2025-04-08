// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//     try {

//         //collect token from cookies
//         const token = req.cookie;

//         if(!token){
//             return res.status(401).json({ message: "User not autherized" })
//         }
        
//         //decode token
//         const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
//         console.log(decodeToken, "=============Decoded token");
        
//         if(!decodeToken){
//             return res.status(401).json({ message: "user not autherized" })
//         }

//         req.user = decodeToken;
        
//         //check
//         next()

//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500),json({ message : error.message || "Internal server error" })
//     }
// };

// export default authUser;