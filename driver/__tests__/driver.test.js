'use strict';

require('dotenv').config();
const checkEvent = require('../driver.js');

//require
//jest.mock and bring in the module you want to mock
// create the spy.mock implementation and pass in what you want your function to actually do
// https://github.com/codefellows/seattle-javascript-401d36/blob/master/class-02/typed-demo/fetch/lib/input.test.js
// jest.mock('net');
// const net = require('net');
// net.mockImplementation(() => {
//   return {
//     Socket: function(){return { connect: jest.fn(), write: jest.fn()}}
//   }
// });



describe('testing driver', () => {
  
  it('should log when event is package-ready', (done) => {
    let buffer = JSON.stringify({store: 'Test Store', orderId: '1234', customer: 'Test Customer', address: '123 Main Street, AnyCity, AnyState, 12345'}); 
    const result = checkEvent(buffer);
    expect(console.log).toHaveBeenCalled();
  });
});