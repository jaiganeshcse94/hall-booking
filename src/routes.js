const express = require('express');
const router = express.Router();
const {
    createRoom,
    bookRoom,
    listRooms,
    listbookings,
    listcustomerBookingDetails,
    listCustomers,
    customerBookingDetails
} = require('./controllers');

// Room routes
// router.post('/rooms', createRoom);
router.get('/rooms', listRooms);

// Booking routes
router.post('/bookings', bookRoom);
router.get('/customers', listbookings);
router.post('/customers', listCustomers);
router.get('/customers/:name', listcustomerBookingDetails);
router.post('/customers/:name', customerBookingDetails);

module.exports = router;