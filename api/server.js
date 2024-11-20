const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection setup
const MONGO_URI = process.env.MONGO_URI; // Use MONGO_URI from the .env file
if (!MONGO_URI) {
  console.error('MONGO_URI is not set in the environment variables.');
  process.exit(1); // Exit the application if MONGO_URI is missing
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Import the User model
const User = require('../models/user'); // Adjust path as needed

// Registration route
app.post('/register', (req, res) => {
  const { firstName, middleName, lastName, mobile, gmail, address, workArea, area, shopName } = req.body;

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

  newUser
    .save()
    .then(() => {
      res.send('<h2>Registration Successful!</h2><p>Your registration has been completed successfully.</p><a href="/">Go to Home</a>');
    })
    .catch((error) => {
      console.error('Error saving user:', error);
      res.status(500).send('<h2>Error!</h2><p>Something went wrong. Please try again later.</p>');
    });
});

// Endpoint to fetch all users from the database
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// Serve static files
app.use(express.static('publicc')); // Serves files from the publicc folder

// Start the server
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
