import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addFoodToCart, getCart, removeFoodFromCart } from '../controllers/cartController.js';
const cartRouter = express.Router();

//add to cart
cartRouter.post("/add-to-cart",authMiddleware,addFoodToCart)

//remove from cart
cartRouter.delete("/remove-from-cart",authMiddleware,removeFoodFromCart)

// //clear cart

//get cart details
cartRouter.get("/get-cart-details",authMiddleware,getCart)


export default cartRouter;