const https = require('https');
const fs = require("fs");
const express = require('express')
const path = require('path')
const app = express()
// const apiKeyMiddleware = require('./middleware/api.middleware')

let morgan = require('morgan')
require('dotenv').config()
app.use(morgan('tiny'))

app.use(express.json())


//app.use(express.static(__dirname, { dotfiles: 'allow' } ));
// app.use(apiKeyMiddleware)
const utilsFolderPath = path.join(__dirname, 'utils');
//app.use('/.well-known/acme-challenge', express.static('.well-known/acme-challenge'));

// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/booking.thenewabacus.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/booking.thenewabacus.com/cert.pem'),
// };
// const server = https.createServer(options, app);


const bookingsRouter = require('./routes/bookings.route');
const seatsRouter = require('./routes/seat.route');

// Use the router files
app.use(bookingsRouter);
app.use(seatsRouter);
app.listen(process.env.web_port, () => {
    console.info('server running on web_port: ',process.env.web_port)
})
// server.listen(443, () => {
//   console.log('Express server running over HTTPS');
// });