import React, { useEffect, useState } from "react";
import { getCart, makePayment } from "../services/cartApi";
import {loadStripe} from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE)

function CartPage() {

    const [cartItems,setCartItems] = useState([])

    useEffect(()=>{
        getCart().then((res)=>{
            console.log(res);
            setCartItems(res?.data?.foods)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const makePaymentFunction = async () => {
        const body = {
            products: cartItems
        }

        const response = await makePayment(body)
        console.log(response.data.sessionId," Stripe ");

        const session = response.data.sessionId

        const stripe  = await stripePromise

        if(stripe){
            const result = await stripe.redirectToCheckout({
                sessionId: session
            })
            if(result.error){
                console.log(result.error.message);
            }
        }else{
            console.log("Stripe failed to load");
        }
         
    }

    return (
        <div className="space-y-2">
          {
            cartItems.map((item,index)=>(
                <div key={index} className=" bg-gray-300 shadow-xl flex items-center w-full justify-between p-5 text-black">
                <figure>
                    <img
                        src={item.foodId.image}
                        alt="Shoes"
                        className="w-28 [h-100px] "
                    />
                </figure>
                <div>
                    <h1 className="text-xl font-bold">
                        {item.foodId.title}</h1>
                </div>
                <div className="">
                    <p>PRICE : ₹{item.price}</p>
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Remove</button>
                </div>
            </div>
            ))
          }
          <div className="flex items-center justify-center">
          <button className="btn btn-success" onClick={makePaymentFunction}>Checkout</button>
          </div>
        </div>
    );
}

export default CartPage;
