const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Create a middleware function for verifying JWT tokens.

    const token = req.cookies.token;
    // Extract the JWT token from the cookies in the request.

    if (!token) {
        return res.status(401).json("You are not authenticated!");
        // If there is no token in the request, return a 401 status with an authentication error message.
    }

    jwt.verify(token, process.env.SECRET, async (err, data) => {
        // Verify the JWT token with the provided secret.

        if (err) {
            return res.status(403).json("Token is not valid!");
            // If the token is not valid, return a 403 status with an error message.
        }

        req.userId = data._id;
        // If the token is valid, extract the user's ID from the token and store it in the request object.

        console.log("passed")
        next();
        // Call the 'next' function to allow the request to continue to the next middleware or route.
    }
    );
};

// Export the 'verifyToken' middleware for use in your routes.
module.exports = verifyToken;
