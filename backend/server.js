// server.js
const express = require('express');
const authRouter = require('./routes/authRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dataRouter = require('./routes/dataRouter');
const gptRouter = require('./routes/gptRouter')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
}));
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cazam');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.use('/api', dataRouter);
app.use('/auth', authRouter); // Mount the authRouter at '/auth'
app.use('/gpt', gptRouter)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;