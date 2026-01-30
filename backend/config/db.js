import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const DB_NAME = 'WEDME'
const DbConnect = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        return conn
    }catch(err){
        console.error('MongoDB connection error:', err.message)
        process.exit(1)
    }
}

export default DbConnect;