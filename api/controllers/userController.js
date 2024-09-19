const User = require('../modals/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res, next)=>{
    if(!req.user.isAdmin){
        return next(new CustomError.UnauthorizedError('You are not allowed to see all users'));
    } 

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit);

        const usersWithoutPassword = users.map((user)=>{
            const {password, ...rest} = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt: {$gte: oneMonthAgo}
        });

        res.status(StatusCodes.OK).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers
        })

    } catch (error) {
        next(error);
    }
}


const updateUser = async (req, res, next)=>{
    const { userId } = req.params;
    const { name, email, profilePicture, password } = req.body;

    if (req.user.id !== userId) {
        return next(new CustomError.UnauthenticatedError('You are not allowed to update this user'));
    }

    if (password) {
        if (password.length < 6) {
            return next(new CustomError.BadRequestError('Password must be at least 6 characters long'));
        }

        req.body.password = bcryptjs.hashSync(password, 10);
    };
      
    if (name) {
        if (name.length < 3 || name.length > 20) {
            return next(new CustomError.BadRequestError('User Must be between 7 and 20 characters'));
        }
        if (name.includes(' ')) {
            return next(new CustomError.BadRequestError('name cannot contain spaces'));
        }
        if (name !== name.toLowerCase()) {
            return next(new CustomError.BadRequestError('name must be lowercase'));
        }
        if (!name.match(/^[a-zA-Z0-9]+$/)) {
            return next(new CustomError.BadRequestError('name can only contain letters and numbers'));
        }
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { name, email, profilePicture, password: req.body.password },
          { new: true }
        );

        const { password: _, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}


const deleteUser = async (req, res, next) => {
    if(!req.user.isAdmin && req.user.id !== req.params.userId){
        return  next(new CustomError.ForbiddenError("You don't have permission to delete this"));
    }

    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(StatusCodes.OK).json('User has been deleted');
    } catch (error) {
        next(error);
    }
}

const signOut = async(req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            return next(new CustomError.NotFoundError('No user found with that ID'));
        }

        const {password, ...rest} = user._doc;
        res.status(StatusCodes.OK).json(rest);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    signOut,
    getUser,
}