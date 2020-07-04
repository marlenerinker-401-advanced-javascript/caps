'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');



socket.emit('subscribe', 'acme-widgets');
socket.emit('getAll');
socket.on('delivered', confirmDelivery);




function confirmDelivery(payload){
  console.log('message received', payload);
  socket.emit('received', payload)
}