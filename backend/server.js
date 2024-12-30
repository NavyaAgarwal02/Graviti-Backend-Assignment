require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Allow requests from the frontend origin

// Routes
app.use('/auth', authRoutes);
app.use('/admin', userRoutes);

// Database and Server Start
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
    )
    .catch((err) => console.log(err));

// Connect to Database
connectDB();
