const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hallbooking', {
    useNewUrlParser: true,
}).then(() => {
    console.log(`connection to database established`)
}).catch(err => {
    console.log(`db error ${err.message}`);
    process.exit(-1)
});

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seats: { type: Number, required: true },
    amenities: [String],
    pricePerHour: { type: Number, required: true },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
}, { collection: 'rooms' });

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    status: { type: String, default: 'Booked' }
}, {
    timestamps: true
});

const Room = mongoose.model('Room', roomSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Room, Booking };