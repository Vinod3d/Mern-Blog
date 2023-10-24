require('dotenv').config();
require('./routes/conn')
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const authRoute = require('./routes/auth')
const postRoute=require('./routes/posts')



app.use(express.json())
app.use("/Api/auth", authRoute)
app.use("/api/posts",postRoute)

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port " +  process.env.PORT);
})