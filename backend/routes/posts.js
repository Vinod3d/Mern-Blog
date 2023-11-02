const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('./verifyToken')


//CREATE
router.post("/create", async (req,res)=>{
    try{
        const newPost=new Post(req.body)
        // console.log(req.body)
        const savedPost=await newPost.save()
        
        res.status(200).json(savedPost)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
})

//DELETE
router.delete('/:id', verifyToken, async(req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("User has been deleted")
    }

    catch(err){
        res.status(401).json({msg:"Failed to delete user"});
    }
})


//UPDATE
router.put("/:id",verifyToken, async (req,res)=>{
    try{
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POSTS
router.get("/",async (req,res)=>{
    const query = req.query
    console.log(query)
    try{
        const searchFilter = {
            title: {
                $regex: query.search, // Define a regular expression pattern for matching post titles.
                $options: "i" // Use the "i" option to perform a case-insensitive search.
            }
        };
        const posts= await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER POSTS
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})



//SEARCH POSTS
// router.get('/search/:prompt', async function(req, res) {
//     try{

//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })



module.exports=router