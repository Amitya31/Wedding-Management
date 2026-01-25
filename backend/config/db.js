import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const DB_NAME = 'WEDME'
const DbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{dbName:DB_NAME})
    }catch(err){
        console.log(err.message)
    }
}

export default DbConnect;