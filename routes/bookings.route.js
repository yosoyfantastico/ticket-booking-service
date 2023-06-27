const express = require('express');
const bookingsRouter = express.Router();
const bookingsController = require('../controllers/bookings.controller');

// GET /bookings?userIdentifier=<email or phone number>
bookingsRouter.get('/bookings', bookingsController.getBookings);

// POST /booking
bookingsRouter.post('/booking', bookingsController.createBooking);

module.exports = bookingsRouter