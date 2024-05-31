const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String
});

// Export user schema
module.exports = userSchema;
