const users = require('../data/user.json');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {};

authController.createProfile = async (req, res) => {
    const { name, email, password, confirmPassword, height, weight } = req.body;
    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            userName: req.body.userName,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            height: req.body.height,
            weight: req.body.weight
        });
        // Save user to database
        await newUser.save();
        res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
};

authController.login = (req, res) => {
    const { userName, password } = req.body;

    // Find user in the users array
    const user = users.find(u => u.userName === userName && u.password === password);

    if (user) {
        // Generate JWT token
        const token = jwt.sign({ userName: user.userName }, '3d6818d12074be9c939de6c49c62f0bc', { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

authController.logout = (req, res) => {
    
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = authController;
