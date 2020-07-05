'use strict';

let test = require('../acme-widgets/app.js');
const { hasUncaughtExceptionCaptureCallback } = require('process');
jest.spyOn(console, 'log');

describe('Test Delivery Confirmation', () => {
  it('Should log when delivery is confirmed', () => {
    test('this is the payload');
    expect(console.log).toHaveBeenCalledWith('message received','this is the payload');
  });
});