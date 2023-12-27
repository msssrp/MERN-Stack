const express = require('express')
const app = express()
const brycpt = require('bcryptjs')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT
const salt = brycpt.genSaltSync(10)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
//upload file , picture
const multer = require('multer')
const uploadMiddleware = multer({dest:"uploads/"})
const fs = require('fs')
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


//create post
const PostModel = require('./models/post')
const path = require('path')
app.post('/post',uploadMiddleware.single('file') , async(req,res)=>{
    const {originalname , path} = req.file
    const parts = originalname.split('.')
    const ext= parts[parts.length-1]
    const newPath = path + '.' + ext
    fs.renameSync(path,newPath)
    const {token} = req.cookies
    jwt.verify(token,secret,async(err,info)=>{
        if(err) console.log(err)
        const {title , summary , content } = req.body
        const postDoc = await PostModel.create({
            title:title,
            summary:summary,
            content:content,
            cover:newPath,
            author:info.id
        })
        res.json(postDoc)
    })
})

//put
app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
    const postId = req.params.id;
  
    const fileDetails = req.file;
  
    if (fileDetails && fileDetails.originalname && fileDetails.path) {
      const { originalname, path } = fileDetails;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      fileDetails.newPath = newPath;
    }
  
    const { token } = req.cookies;
  
    jwt.verify(token, secret, async (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to verify token.' });
      }
      
  
      const { userId, title, summary, content } = req.body;
      const postData = await PostModel.findById(postId)

      if(postData.author.toString() != userId){
        return res.status(401).json('User dont match with author')
      }
      const updateFields = {};
      
      if (title) updateFields.title = title;
      if (summary) updateFields.summary = summary;
      if (content) updateFields.content = content;
      if (fileDetails && fileDetails.newPath) updateFields.cover = fileDetails.newPath;
  
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          postId,
          updateFields,
          { new: true }
        );
  
        if (!updatedPost) {
          return res.status(404).json({ error: 'Post not found.' });
        }
  
        res.json(updatedPost);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update post.' });
      }
    });
});
  
//get
app.get('/posts',async(req,res)=>{
    const posts = await PostModel.find()
    if(posts.length === 0){
        res.status(404).json("cant find post")
    }
    res.status(202).json(posts)
})


app.get('/post/:id',async(req,res)=>{
    const id = req.params.id
    if(!id){
        res.status(404).json("no id provided")
    }
    try {
    const post = await PostModel.findById(id)
    if(!post){
        res.status(404).json(`no document found on this ${id}`)
    }
    res.status(202).json(post)   
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})

//delelte
app.delete('/post/:id', async(req,res)=>{
    const id = req.params.id
    if(!id){
        res.status(404).json('please provide id')
    }
    try {
        const result = await PostModel.deleteOne({_id:id})
        if(result.deletedCount === 0){
            console.log(result.deletedCount)
            res.status(404).json(`Cannot delete post ${id} maybe wronge id`)
        }
        res.status(202).json(`${id} deleted`)
    } catch (error) {
        console.log(error)
    }
})

app.use('/uploads' , express.static(path.join(__dirname,'uploads')))

app.get("/",(req,res)=>{
    res.send("API FOR NPRU BLOG")
})

app.listen(PORT , ()=>{
    console.log(`Server is running on port : ${PORT}`)
})