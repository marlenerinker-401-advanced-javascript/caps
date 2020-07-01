'use strict';

const net = require('net');
const Client = new net.Socket();

Client.connect(3000, 'localhost', () => {
  console.log('connected to server');
});// export this and run from an index


Client.on('data', checkEvent);

function checkEvent(buffer) {
  let data = JSON.parse(buffer.toString());
  if(data.event === 'package-ready') {
    handlePickup(data);
  }
  return data;//need for testing
}


function handlePickup(data) {
  setTimeout(function(){
  console.log(`DRIVER: picked up ${data.payload.orderId}`);
  Client.write(JSON.stringify({event: 'in-transit', payload: data.payload}));
  }, 1000)
  setTimeout(function(){
    Client.write(JSON.stringify({event: 'package-delivered', payload: data.payload}));
  }, 3000)
  
}

module.exports = checkEvent;
