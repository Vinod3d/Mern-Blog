const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const commentRoute = require('./routes/comments');
const path = require('path');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors({ origin: 'https://mern-blogs-app.vercel.app', credentials: true }));
app.use(cookieParser();
app.use('/images', express.static(path.join(__dirname, '/images')));

// Define your routes on the router
router.use('/api/auth', authRoute);
router.use('/api/users', userRoute);
router.use('/api/posts', postRoute);
router.use('/api/comments', commentRoute);

app.use('/.netlify/functions/api', router); // This is the base path for Vercel serverless functions

// Image upload
const imagesDirectory = 'images';
if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.img);
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        // Your file upload logic here
        res.status(200).json('Image has been uploaded successfully');
    } catch (error) {
        console.error('Error while uploading:', error);
        res.status(500).json('Image upload failed');
    }
});

module.exports = app; // Export the Express app

// Vercel-specific code to handle serverless functions
module.exports.handler = serverless(app);
