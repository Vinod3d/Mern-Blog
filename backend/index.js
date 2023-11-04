require('dotenv').config();
require('./routes/conn')
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
const multer=require("multer")
const cookieParser=require('cookie-parser')
const fs = require('fs');
const authRoute = require('./routes/auth')
const postRoute=require('./routes/posts')
const userRoute=require('./routes/users')
const commentRoute=require('./routes/comments');
const path = require('path');




app.use(express.json())
// app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cors(
    {
        origin: ["https://mern-blogs-api.vercel.app"],
        // methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(cookieParser())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use("/api/auth", authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

//image upload
// Create the "images" directory if it doesn't exist
const imagesDirectory = 'images';
if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesDirectory); // Use the existing or newly created "images" directory
    },
    filename: (req, file, cb) => {
        cb(null, req.body.img);
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        // Your file upload logic here
        res.status(200).json("Image has been uploaded successfully");
    } catch (error) {
        console.error("Error while uploading:", error);
        res.status(500).json("Image upload failed");
    }
}); 
  

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port " +  process.env.PORT);
})