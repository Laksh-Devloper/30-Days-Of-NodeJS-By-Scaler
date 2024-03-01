const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Define Mongoose schema for User
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Create Mongoose model for User
const User = mongoose.model('User', userSchema);

// MongoDB URI provided
const uri = `mongodb+srv://laksh:1722L@cluster0.hoeawxa.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB using provided URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Express route to calculate the average age of all users
app.get('/average-age', async (req, res) => {
  try {
    // Use MongoDB aggregation to calculate the average age
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' }
        }
      }
    ]);

    // Extract the average age from the result
    const averageAge = result.length > 0 ? result[0].averageAge : 0;

    // Send JSON response with the calculated average age
    res.json({ averageAge });
  } catch (error) {
    console.error('Error calculating average age:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
