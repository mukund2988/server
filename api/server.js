const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Set up middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection setup
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Import the User model
const User = require('../models/user');  // Adjust path as needed

// Registration route
app.post('/register', (req, res) => {
  const { firstName, middleName, lastName, mobile, gmail, address, workArea, area, shopName } = req.body;

  // Create a new user object
  const newUser = new User({
    firstName,
    middleName,
    lastName,
    mobile,
    gmail,
    address,
    workArea,
    area: area || [],
    shopName,
  });

  // Save the user to the MongoDB database
  newUser.save()
    .then(() => {
      res.send('<h2>Registration Successful!</h2><p>Your registration has been completed successfully.</p><a href="/">Go to Home</a>');
    })
    .catch((error) => {
      console.error('Error saving user:', error);
      res.status(500).send('<h2>Error!</h2><p>Something went wrong. Please try again later.</p>');
    });
});

// Endpoint to fetch all users from the instint_data collection
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the "instint_data" collection
    res.json(users); // Send the list of users as JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// Serve static files
app.use(express.static('publicc'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
