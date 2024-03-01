const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5400;

// Replace `YOUR_MONGODB_PASSWORD` with your actual password or use environment variables/secure configuration for better security
const uri = `mongodb+srv://laksh:1722L@cluster0.hoeawxa.mongodb.net/?retryWrites=true&w=majority`;

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Create the user model
const userModel = mongoose.model('User', userSchema);

// Function to get all users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.find();
    console.log('User database is fetched...');
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error.message);
    res.status(500).send('Error retrieving users');
  }
}

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');

    // Define the route to get all users
    app.get('/users', getAllUsers);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Close the connection (optional)
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

