'use strict';

// require('dotenv').config();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');


class Queue {
  constructor(companyID) {
    this.clientId = companyID,
    this.messages = {}
  }

  subscribe(event, action) {
  socket.emit('subscribe', this);
  socket.on(event, (payload) => {
    socket.emit('received', payload);
    action(payload);
  });
 }

 trigger(event, payload) {
  socket.emit(event, payload);
 }

}
module.exports = Queue;

