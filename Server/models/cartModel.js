import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foods: [
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Foods',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
});


cartSchema.methods.calculateTotalPrice = function () {
   return this.totalPrice = this.foods.reduce((total, food) => total + food.price, 0)
}

const Cart = new mongoose.model("Cart",cartSchema)

export default Cart;