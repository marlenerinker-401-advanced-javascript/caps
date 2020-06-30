'use strict';

const events = require('./lib/events.js');

require('dotenv').config();

const startOrders = require('./lib/vendor.js');

require('./lib/driver.js');
require('./lib/vendor.js');



//should listen for these, then log, then emit with same event and payload
events.on('ready-for-pickup', (payload) => {
  let time = new Date();
  console.log({ event: 'Ready for Pickup', time, payload });
  events.emit('package-ready', payload);
});

events.on('in-transit', (payload) => {
  let time = new Date();
  console.log({ event: 'In-transit', time, payload });
  events.emit('package-in-transit', payload);
});

events.on('delivered', (payload) => {
  let time = new Date();
  console.log({ event: 'Delivered', time, payload });
  events.emit('package-delivered', payload);
});

startOrders();

