const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Signup
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = await User.create({ name, email, password, role });
        res.status(201).json({ token: generateToken(newUser._id) });
    } catch (error) {
        console.error('Error occurred during authentication:', error); // Use the error variable
        // Optionally, return an error response
        return res.status(500).json({ message: 'Authentication failed' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email); // Log the email being used for login
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found'); // Log if user is not found
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials'); // Log if credentials are invalid
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        console.log('User ID:', user._id); // Log the user ID being returned
        res.status(200).json({ token, userId: user._id }); // Respond with token and user ID
    } catch (error) {
        console.error('Server Error:', error); // Log any server errors
        res.status(500).json({ message: 'Server Error' });
    }
};
