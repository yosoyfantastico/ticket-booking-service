async function getBookings(req, res) {
  const seatId = req.params.id;
  return res.send(`Seat ${seatId} is booked`);
}

async function createBooking(req, res) { 
  let { seat_identifier, name, phone } = req.body
  console.log(seat_identifier)
  let query = `INSERT INTO bookings (seat_identifier, name, phone) VALUES ('${seat_identifier[i]}', '${name}', '${phone}')`

  return res.send(`Seat ${seat_identifier} is booked by ${name} with phone number ${phone}`);
}

module.exports = {
  getBookings,
  createBooking,
};