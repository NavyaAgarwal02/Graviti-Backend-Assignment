const User = require('../models/userModel');

// Get all users (Admin)
exports.getAllUsers = async (req, res) => {
    try {
        // Find users with role 'user' and exclude the 'role' field from the response
        const users = await User.find({ role: 'user' }); // Exclude the role field
        res.status(200).json(users); // Respond with the filtered user details
    } catch (error) {
        console.error('Error occurred while fetching users:', error); // Use the error variable
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
};

exports.getUserLogs = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from route parameters

        // Fetch the user making the request
        const requestingUser = await User.findById(req.user.id); // Assuming req.user is populated by your auth middleware
        if (!requestingUser) {
            return res.status(404).json({ message: 'Requesting user not found' });
        }

        // Check if the requesting user is a user
        if (requestingUser.role === 'user') {
            return res.status(403).json({ message: 'Users are not allowed to perform this operation' });
        }

        // Fetch the user whose logs are being requested
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has not role 'admin'
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Only users with role "admin" can access their location logs' });
        }

        // Return the user's location logs
        res.status(200).json(user.locationLogs);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};



