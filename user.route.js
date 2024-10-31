import express from 'express'
import bcrypt from 'bcrypt';
import User from '../models/user.models.js'

import jwt from 'jsonwebtoken';


const routes = express.Router()



routes.post('/signup', async (req,res)=>{
    const {username,email,password} = req.body;
    if (!username    || !email || !password) return res.status(400).json({message:"invalid credentials"});
    const user = await User.findOne({email});
    if (user){
        return res.status(400).json({message:"user already exists"});
    }
    const passwordHash = await bcrypt.hash(password,10)
    try {
        const newUser = await User.create({ username, email, password: passwordHash });
        return res.status(201).json({status:true,newUser});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
})
routes.post('/login', async (req,res)=>{
    const {email,password} = req.body;
    if (!email || !password) return res.status(400).json({message:"invalid credentials"});
    const user = await User.findOne({email});
    if (!user){
        return res.status(400).json({message:"invalid credentials"});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(500).json({message:"invalid credentials"});
    try {
        const token = jwt.sign({username: user.username}, process.env.KEY,{expiresIn: '2days'});
        res.cookie('token',token,{httpOnly:true,maxAge: 2 * 24 * 60 * 60 * 1000});

        return res.status(201).json({status:true,message:"login successful"});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
})









export default routes