import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const paymentFunction = async (req, res) => {
    try {
        const { products } = req.body

        const lineItems = products?.map((product)=>({
            price_data: {
                currency: 'inr',
                product_data:{
                    name:product.foodId.title,
                    images:[product.foodId.image]
                },
                unit_amount: Math.round(product.foodId.price * 100),
            },
            quantity: 1
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items: lineItems,
            mode:'payment',
            success_url: `${process.env.FRONTEND_URL}payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}payment/failed`
        })

        res.status(200).json({
            success: true, sessionId: session.id
        })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || " internal server error " })
        
    }
}