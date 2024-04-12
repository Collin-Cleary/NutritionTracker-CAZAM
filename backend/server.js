// server.js
const express = require('express');
const authRouter = require('./routes/authRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dataRouter = require('./routes/dataRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cazam');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.use('/api', dataRouter);
app.use('/auth', authRouter); // Mount the authRouter at '/auth'

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;