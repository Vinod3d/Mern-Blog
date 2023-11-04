require('dotenv').config();
require('./routes/conn');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const commentRoute = require('./routes/comments');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser();
app.use('/images', express.static(path.join(__dirname, '/images')));

// Set up CORS for your serverless functions
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://mern-blogs-app.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Define your serverless function for handling requests
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

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

module.exports = app; // Export the Express app

// Vercel-specific code to handle serverless functions
module.exports.handler = (req, res) => {
    app(req, res);
};
