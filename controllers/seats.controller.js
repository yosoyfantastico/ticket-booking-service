async function getSeatById(req, res) {
    const seatId = req.params.id;
    return res.send(`Seat ${seatId} is booked`);
}
async function getSeats(req, res) {
    return res.send('All seats are booked');
}
module.exports = {
    getSeatById,
    getSeats,
};