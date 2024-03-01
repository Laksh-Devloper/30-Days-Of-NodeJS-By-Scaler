const express = require('express');

/**
 * Logging middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function loggingMiddleware(req, res, next) {
  // Log timestamp
  const timestamp = new Date().toISOString();

  // Log HTTP method, URL, headers, and request body
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  // Call next middleware
  next();
}

const app = express();

// Use logging middleware
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(loggingMiddleware);

// Define your routes and other middleware as needed
// For example:
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
