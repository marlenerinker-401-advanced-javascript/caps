'use strict';



require('dotenv').config();
const handleData = require('../caps.js');
jest.spyOn(global.console, 'log');


describe('testing ordering system', () => {
  it('should log when data includes event and payload', (done) => {
    let buffer = JSON.stringify({ payload: {store: 'Test Store', orderId: '1234', customer: 'Test Customer', address: '123 Main Street, AnyCity, AnyState, 12345'}})
    const result = handleData(buffer);
    expect(console.log).not.toHaveBeenCalled();
    done();
  });
  
  it('should log when data includes event and payload', (done) => {
    let buffer = JSON.stringify({event: 'package-ready', payload: {store: 'Test Store', orderId: '1234', customer: 'Test Customer', address: '123 Main Street, AnyCity, AnyState, 12345'}})
    const result = handleData(buffer);
    expect(console.log).toHaveBeenCalled();
    done();
  });

});