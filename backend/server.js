import express from "express";
import dotenv from "dotenv";
import DbConnect from "./config/db.js";
dotenv.config();
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

// Add JSON parsing error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('JSON Parsing Error:', err);
        console.error('Request body:', req.body);
        console.error('Request headers:', req.headers);
        return res.status(400).json({
            success: false,
            message: 'Invalid JSON in request body',
            error: err.message
        });
    }
    next(err);
});

app.get("/",(req,res)=>{
    res.send({message:"Hello world"})
})

import AuthRouter from './routes/auth.route.js'
import VendorRouter from './routes/vendor.route.js'
import UserRouter from './routes/user.route.js'
import BookingRouter from './routes/booking.route.js'
import FavouriteRouter from './routes/favourite.route.js'
import ContactRouter from './routes/contact.route.js'
import ReviewRouter from './routes/review.route.js'
app.use('/api/auth',AuthRouter)
app.use('/api/vendor',VendorRouter)
app.use('/api/user',UserRouter)
app.use('/api/booking',BookingRouter)
app.use('/api/favourite',FavouriteRouter)
app.use('/api/contact',ContactRouter)
app.use('/api/review',ReviewRouter)

const connectDB = async ()=>{
    try {
        await DbConnect()
        console.log("Connected to DB")
        
        app.listen(PORT,()=>{
            console.log(`Server listening on PORT:${PORT}`)
            console.log('http://localhost:3000')
        });
    } catch (error) {
        console.error('Failed to start server:', error.message)
        process.exit(1)
    }
}

connectDB()

app.post('/auth',async (req,res)=>{
    try {
        const {username,email,password} = req.body;

        const user = await UserModel.create({
            username,
            password,
            email,
        })

        return res.json({
            user
        })
    }catch(e){
        return res.json({
            message:error.message
        })
        console.log(e.message)
    }
})

