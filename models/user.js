const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  gmail: { type: String, required: false },
  address: { type: String, required: true },
  workArea: { type: String, required: true },
  area: { type: [String], required: false },
  shopName: { type: String, required: false },
});

// Specify the database name and collection
const User = mongoose.model('User', userSchema, 'instint_data'); // 'instint_data' is the collection name in 'test' database

module.exports = User;
