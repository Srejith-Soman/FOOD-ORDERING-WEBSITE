import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addFoodToCart, clearCart, getCart, removeFoodFromCart } from '../controllers/cartController.js';
const cartRouter = express.Router();

//add to cart
cartRouter.post("/addtocart/:foodId",authMiddleware,addFoodToCart)

//get cart details
cartRouter.get("/getcart",authMiddleware,getCart)

//remove from cart
cartRouter.delete("/remove-from-cart/:fooodId",authMiddleware,removeFoodFromCart)

//Clear cart
cartRouter.post("/clear-cart",authMiddleware,clearCart)

export default cartRouter;