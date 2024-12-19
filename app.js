// Beckn Boilerplate Backend (Node.js)
// Author: Aman Kumar

const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const winston = require('winston');
require('dotenv').config();

const app = express();

// Configure Winston Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' },
});
app.use(limiter);
app.use(express.json({ limit: '10kb' }));
app.use(xss());

// Utility function to validate URLs
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Utility function to validate input
function isValidInput(input) {
    return typeof input === 'string' && input.trim().length > 0;
}

// Environment Variables
if (!process.env.BECKN_DISCOVERY_URL || !isValidUrl(process.env.BECKN_DISCOVERY_URL)) {
    throw new Error('BECKN_DISCOVERY_URL environment variable is not set or invalid');
}
if (!process.env.BECKN_ORDERING_URL || !isValidUrl(process.env.BECKN_ORDERING_URL)) {
    throw new Error('BECKN_ORDERING_URL environment variable is not set or invalid');
}

const BECKN_DISCOVERY_URL = process.env.BECKN_DISCOVERY_URL;
const BECKN_ORDERING_URL = process.env.BECKN_ORDERING_URL;

// Sample Service Discovery Endpoint
app.get('/discover', async (req, res) => {
    const location = req.query.location;
    const category = req.query.category;

    if (!isValidInput(location) || !isValidInput(category)) {
        return res.status(400).json({ error: 'Invalid input for location or category' });
    }

    const queryParams = { location, category };

    try {
        const response = await axios.post(BECKN_DISCOVERY_URL, queryParams);
        res.status(200).json({ services: response.data });
    } catch (error) {
        logger.error('Error in /discover endpoint', { error: error.message, stack: error.stack });
        res.status(500).json({ error: error.message });
    }
});

// Sample Ordering Endpoint
app.post('/order', async (req, res) => {
    const orderDetails = req.body;

    try {
        const response = await axios.post(BECKN_ORDERING_URL, orderDetails);
        res.status(201).json({ order_confirmation: response.data });
    } catch (error) {
        logger.error('Error in /order endpoint', { error: error.message, stack: error.stack });
        res.status(500).json({ error: error.message });
    }
});

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        logger.error('Failed to start the server', { error: err.message, stack: err.stack });
        process.exit(1);
    }
    const mode = process.env.NODE_ENV || 'development';
    logger.info(`Server is running on port ${PORT} in ${mode} mode`);
});
