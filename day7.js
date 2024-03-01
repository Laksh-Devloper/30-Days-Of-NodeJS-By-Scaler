const express = require('express');
const app = express();

function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`${timestamp} - ${method} request received`);
  next();
}

function authenticateMiddleware(req, res, next) {
  
  req.user = { username: 'exampleUser' };
  next();
}

app.use(requestLoggerMiddleware);
app.use(authenticateMiddleware);

app.get('/', (req, res) => {
  
  res.send('Hello World!');
});

app.get('/public', (req, res) => {
    res.send('This is a public route');
  });
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
