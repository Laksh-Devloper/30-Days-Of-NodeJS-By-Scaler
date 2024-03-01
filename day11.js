const jwt = require('jsonwebtoken');

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
  // Get the JWT from the request headers
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    // No token provided, return 401 Unauthorized
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'ofleevevdveveevevevel342wef');

    // Add the decoded token payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Token is invalid, return 401 Unauthorized
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = authenticationMiddleware;
