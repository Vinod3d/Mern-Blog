const User = require('../modals/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const jwt  = require("jsonwebtoken");
const bcrypt = require('bcryptjs');



const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ name, email, password : hashedPassword });
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    next(error);
  }
};



const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid email or password');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new CustomError.UnauthenticatedError('Invalid email or password');
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '8d' }
    )
    
    const {password: pass, ...rest} = user._doc;

    res.status(StatusCodes.OK).cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    }).json(rest);

  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || 'Something went wrong' });
  }
};

const google = async (req, res, next) => {
  const {email, name, photo} = req.body;
  try {
    const user = await User.findOne({ email });
    if(user){
      const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn:'8d'});
      const {password, ...rest} = user._doc;
      res.status(StatusCodes.OK).cookie('access_token', token,  {httpOnly:true}).json(rest);
    } else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        name: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: photo,
      });
      await newUser.save();
      const token = jwt.sign({id: newUser._id, isAdmin : newUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: "8d"});
      const {password, ...rest} = newUser._doc;
      res.status(StatusCodes.OK).cookie('access_token', token,  {httpOnly:true, expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),}).json(rest);
    }
  } catch (error) {
    next(error);
  }
  
}


const checkUser = async(req, res)=>{
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    
    if (user) {
        // User exists
        res.json({ exists: true });
    } else {
        // User doesn't exist
        res.json({ exists: false });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUser = async(req, res)=>{
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (user) {
        // User found, send user data
        res.json(user);
    } else {
        // User not found
        res.status(404).json({ error: 'User not found' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const logout = async(req, res) => {
   
};



module.exports =  {
    signup, signin, google, checkUser, getUser, logout
};