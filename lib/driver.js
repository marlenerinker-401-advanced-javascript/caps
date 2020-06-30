'use strict';

const events = require('./events.js');
require('../caps.js');



function handlePickup(payload) {
  setTimeout(function(){
  console.log(`DRIVER: picked up ${payload.orderId}`);
  events.emit('in-transit', payload);
  }, 1000)
  setTimeout(function(){
    events.emit('delivered', payload);
  }, 3000)
  

  // setTimeout((payload) => {
  //   console.log(payload);
  //   // console.log(`DRIVER: picked up ${payload.id}`);
  //   events.emit('in-transit', payload)
  // }, 1000)
  // setTimeout((results) => {
  //   console.log('Delivered');
  //   events.emit('delivered', payload)
  // }, 3000)
}

events.on('package-ready', handlePickup);