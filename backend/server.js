import express from "express";
import dotenv from "dotenv";
import DbConnect from "./config/db.js";
dotenv.config();
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send({message:"Hello world"})
})

import AuthRouter from './routes/auth.route.js'
import VendorRouter from './routes/vendor.route.js'
import UserRouter from './routes/user.route.js'
app.use('/api/auth',AuthRouter)
app.use('/api/vendor',VendorRouter)
app.use('/api/user',UserRouter)

const connectDB = async ()=>{
    await DbConnect()
    console.log("Connected to DB")
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

app.listen(PORT,()=>{
    console.log(`Listening on PORT:${PORT}`)
    console.log('http://localhost:3000')
});

