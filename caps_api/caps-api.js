'use strict';

const express = require('express');

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

const app = express();
const PORT = process.env.PORT || 3001;

app.post('/delivery/:retailer/:code', deliveryMessage);
app.get('/', (request, response) => {
  response.send('Welcome to the Delivery API.');
});


function deliveryMessage(request, response) {
  let object = {
    retailer: request.params.retailer,
    code: request.params.code
  };
  // console.log(object);
  response.send('delivering message');
  socket.emit('delivered', object);
}


app.listen(PORT, () => {
  console.log('Server is up on port :: ' + PORT);
})