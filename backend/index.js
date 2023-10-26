require('dotenv').config();
require('./routes/conn')
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
const cookieParser=require('cookie-parser')
const authRoute = require('./routes/auth')
const postRoute=require('./routes/posts')
const userRoute=require('./routes/users')
const commentRoute=require('./routes/comments')



app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port " +  process.env.PORT);
})