const express = require('express');
const password = require('./backend/password.api.cjs');
const users = require('./backend/user.api.cjs')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/password', password);
app.use('/api/users', users);

let frontend_dir = path.join(__dirname, 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(process.env.PORT || 8000, function () {
    console.log("Starting app now...")
})