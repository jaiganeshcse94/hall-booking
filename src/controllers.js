const { Room, Booking } = require('./models');

exports.createRoom = async(req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send({
            message: error.message || "Invalid Request",
            error
        });
    }
};

exports.bookRoom = async(req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send({
            message: error.message || "Invalid Request",
            error
        });
    }
};

exports.listRooms = async(req, res) => {
    try {
        const rooms = await Room.find({}).populate('bookings');
        res.status(200).send(rooms);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};

exports.listbookings = async(req, res) => {
    try {
        const bookings = await Booking.find({}).populate('room');
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};

exports.listCustomers = async(req, res) => {
    try {
        const bookings = await Booking.find({}).populate('room');
        const customers = bookings.map(booking => ({
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            room: null,
            status: booking.status,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }));
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.customerBookingDetails = async(req, res) => {
    try {
        const customerName = req.params.name;
        const bookings = await Booking.find({ customerName }).populate('room');
        const customerDetails = bookings.map(booking => ({
            bookingId: booking._id,
            roomName: booking.room.name,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingDate: booking.createdAt,
            bookingStatus: booking.status
        }));
        res.status(200).send(customerDetails);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.listcustomerBookingDetails = async(req, res) => {
    try {
        const customerName = req.params.name;
        console.log(customerName);
        const bookings = await Booking.find({ customerName }).populate('room');
        console.log(bookings);
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({
            message: error.message || "InternalServer Error",
            error
        });
    }
};