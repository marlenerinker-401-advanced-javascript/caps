'use strict';

require('dotenv').config();
const Queue = require('./lib/queue.js');
const company = '1-206-flowers';
const queue = new Queue(company);


queue.subscribe('delivered', confirmDelivery);
queue.trigger('getAll', queue);


function confirmDelivery(payload){
  console.log('message received', payload);
}

module.exports = confirmDelivery;