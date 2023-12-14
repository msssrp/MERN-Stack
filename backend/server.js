const express = require('express')
const app = express()
const brycpt = require('bcryptjs')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT
const salt = brycpt.genSaltSync(10)
app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.json())

//DATABASE CONNECTION
const mongoose = require('mongoose')
const mongo_uri = process.env.MONGO_URL

mongoose.connect(mongo_uri).then((conn , err) =>{
    if(conn){
        return console.log("db connected")
    }
    return console.log(err)
})

//User register
const User = require('./models/user')
app.post("/register",async(req,res)=>{
    const {username , password } = req.body
    try {
        const userDoc = await User.create({
            username,
            password: brycpt.hashSync(password , salt)
        })
        return res.json(userDoc)
    } catch (error) {
        if (error){
            console.log(error)
        }
    }
})


//User Login
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
app.post("/login",async(req,res)=>{
    const {username , password} = req.body
    try {
        const userDoc = await User.findOne({username})
        const isPasswordMatch = brycpt.compareSync(password, userDoc.password)
        if (isPasswordMatch){
            return jwt.sign({username ,id: userDoc.id},secret , {} , (err , token) =>{
                if(err) console.log(err)
                res.cookie("token",token).json({
                    id:userDoc.id,
                    username
                })
            })
        }
        return res.status(400).json("wrong credentail")
        
    } catch (error) {
        console.log(error)
    }
})

//User Logout
app.post('/logout',(req,res)=>{
    res.cookie("token","").json("ok")
})

app.get("/",(req,res)=>{
    res.send("API FOR NPRU BLOG")
})

app.listen(PORT , ()=>{
    console.log(`Server is running on port : ${PORT}`)
})