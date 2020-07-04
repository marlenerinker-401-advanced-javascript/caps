'use strict';

require('dotenv').config();
// const io = require('socket.io-client');
// const socket = io.connect('http://localhost:3000/caps');
const Queue = require('./lib/queue.js');
const company = '1-206-flowers';
const queue = new Queue(company);


queue.subscribe('delivered', confirmDelivery);
queue.trigger('getAll', queue);


function confirmDelivery(payload){
  console.log('message received', payload);
}