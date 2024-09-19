const jwt  = require("jsonwebtoken");
const CustomError = require('../errors');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(new CustomError.UnauthorizedError("You must be logged in to view this resource"));
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(new CustomError.UnauthorizedError('Invalid Token', { error: err.message }));
        }
        req.user = user;
        next();
    });
};

module.exports = verifyToken;