import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.route.js'



dotenv.config()
const app = express();
const db_URI = "mongodb://127.0.0.1:27017/auth";

mongoose.connection.once("open",()=>{
    console.log("connection successful");
})
mongoose.connection.on("error",(error)=>{
    console.log(error.message);
})
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your front-end URL
    credentials: true, // Allow credentials (cookies)
}));
app.use(express.json())
app.use('/auth',userRoute)







async function startServer(){
    await mongoose.connect(db_URI);
    app.listen(process.env.PORT,()=>{
        console.log(`server running on port ${process.env.PORT}`);

    })
    
}
startServer();