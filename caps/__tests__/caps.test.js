'use strict';

require('dotenv').config();
const test = require('../caps.js');
jest.spyOn(global.console, 'log');


// const socketIO = require('socket.io');

// const PORT = process.env.PORT || 3000;
// let ioServer = socketIO(PORT);


// /**
//  * Setup WS & HTTP servers
//  */
// beforeAll((done) => {
  
//   ioServer = socketIO(PORT);
//   done();
// });

// /**
//  *  Cleanup WS & HTTP servers
//  */
// afterAll((done) => {
//   ioServer.close();
  
//   done();
// });



describe('testing ordering system', () => {
  it('should log when package ready for pickup', (done) => {
    let payload = ({store: 'Test Store', orderId: '1234', customer: 'Test Customer', address: '123 Main Street, AnyCity, AnyState, 12345'})
    test.handlePickup(payload);
    expect(console.log).toHaveBeenCalled()
    
    done();
  });

});