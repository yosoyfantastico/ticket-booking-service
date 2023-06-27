const express = require('express');
const seatsRouter = express.Router();
const seatsController = require('../controllers/seats.controller');
// GET /seats/:id
seatsRouter.get('/seats/:id', seatsController.getSeatById);

seatsRouter.get('/seats', seatsController.getSeats);

module.exports = seatsRouter;