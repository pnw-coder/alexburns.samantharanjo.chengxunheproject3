const express = require('express');
const password = require('./backend/password.api.cjs');
const users = require('./backend/user.api.cjs')
const mongoose = require('mongoose');
const path = require('path')

const app = express();

// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb+srv://webproject3:password1234@spr24webdev.sh8d1h1.mongodb.net/?retryWrites=true&w=majority&appName=SPR24WebDev';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.listen(process.env.PORT || 8000, function() {
    console.log("Starting app now...")
})