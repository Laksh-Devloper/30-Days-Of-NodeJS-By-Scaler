const jwt = require('jsonwebtoken');

// Sample user data (replace this with your actual user data retrieval logic)
const users = [
    { id: 1, username: 'admin', password: 'adminpassword', role: 'admin' },
    { id: 2, username: 'user', password: 'userpassword', role: 'user' }
];

// Secret key for JWT signing (replace this with your own secret key)
const jwtSecretKey = 'your_secret_key';

function authenticateAndAuthorize(req, res, next) {
    // Get the token from request header
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, jwtSecretKey);

        // Check if the user exists and has the required role
        const user = users.find(u => u.id === decoded.id && u.username === decoded.username && u.role === req.role);

        if (!user) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // If authentication and authorization passed, attach the user object to the request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authenticateAndAuthorize;
