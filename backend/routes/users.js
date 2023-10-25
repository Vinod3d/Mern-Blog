const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const bcrypt = require('bcrypt');
const verifyToken = require('./verifyToken');

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }); // The { new: true } option ensures the updated user document is returned.

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while trying to update the user.' });
  }
});


//DELETE
router.delete("/:id", verifyToken, async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})



// GET User by ID Route
router.get('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Retrieve the user's information from the database using their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const {password,...info}=user._doc

      // Send the user's information as a JSON response
      res.status(200).json(info);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while trying to fetch the user' });
    }
  });




module.exports = router;
