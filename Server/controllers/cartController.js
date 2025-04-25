import Cart from '../models/cartModel.js'
import Foods from "../models/foodModel.js";

export const addFoodToCart = async (req, res) => {
    try {
        const userId = req.user
        const { foodId } = req.params
        //find the food to ensure it exists and fetch its price
        const food = await Foods.findById(foodId)
        
        if(!food){
            return res.status(400).json({ error: "Food not fount"})
        }

        //find the user's cart or a new one if it doesn't exist
        let cart = await Cart.findOne({ userId })
        if(!cart){
            cart = new Cart({ userId, foods: [] })
        }

        //check if the food is already in the cart  
        const foodExists = cart.foods.some((item)=> item.foodId.equals(foodId));
        if(foodExists){
            return res.status(400).json({ error: "Food already in the cart" });
        }

        //add the foos  to the cart
        cart.foods.push({
            foodId,
            price: food.price
        })

        //Recalculate the total price
        cart.calculateTotalPrice();

        await cart.save();
        
        res.status(200).json({ data: cart, message: " food added to cart" });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.user;

        const cart = await Cart.findOne({ userId }).populate("foods.foodId");
        
        if(!cart){
            return res.status(404).json({ error: 'cart is empty' })
        }

        res.status(200).json( cart )
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}

export const removeFoodFromCart = async (req,res) => {
    try {
        const userId = req.user;
        const { foodId } = req.params

        //find the suer's cart
        let cart  = await Cart.findOne({ userId })
        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
         
        //Remove the food from the cart
        cart.foods = cart.foods.filter((item)=> !item.foodId.equals(foodId));
        
        //Recalculate the total price
        cart.calculateTotalPrice();
        
        //save the cart
        await cart.save();

        res.status(200).json({data: cart, message: "food remove from cart"})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}

export const clearCart = async (req, res)=>{
    try {
         const userId = req.user;

         const cart  = await Cart.findOne({ userId })

         if(!cart){
            return res.status(404).json({ message: "cart not found " })
         }
         cart.foods = []
         cart.calculateTotalPrice(0);
         await cart.save()
         return res.status(200).json({ message: "cart cleared" })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
}