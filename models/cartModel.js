import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foods: [
        {
            foodId: {
                type: mongoose.Types.ObjectId,
                ref: 'Foods',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type:Number,
                required:true,
                default: 0
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
})

cartSchema.method.calculateTotalPrice = function () {
    this.totalPrice = this.foods.reduce((total, food)=> total + food.price, 0)
}

const Cart = new mongoose.model("Cart",cartSchema)

export default Cart;