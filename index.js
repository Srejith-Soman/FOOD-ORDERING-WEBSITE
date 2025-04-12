import express from 'express'
import 'dotenv/config'
import connectDB from './config/dbConnection.js'
import userRouter from './routes/userRoutes.js'
import foodRouter from './routes/foodRoutes.js'
import cartRouter from './routes/cartRoutes.js'

const app = express()



app.get("/",(req,res)=>{
    res.json("Server Started")
})

//Connect DB
connectDB()

//middleware
app.use(express.json())

//routes
app.use("/user",userRouter)
app.use("/food",foodRouter)
app.use('/cart',cartRouter)

app.all("*",(req, res, next)=> {
    res.status(404).json({ message: "emdpoint dose not exist "})
})

app.listen(process.env.PORT ,()=>{
    console.log(`Server Start on Port ${process.env.PORT} `);
    
})