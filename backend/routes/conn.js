const mongoose = require("mongoose");
require('dotenv').config();
const DB = process.env.MONGO_URL;
mongoose.connect(DB)

mongoose.connection.on('error', err=>{
    console.log('conection failed');
});

mongoose.connection.on('connected', connected=>{
    console.log('conected with database....');
});