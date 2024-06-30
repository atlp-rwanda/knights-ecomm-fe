// src/utils/test-utils.test.tsx
// import React from 'react';
import { cleanup } from './test-utils';
import '@testing-library/jest-dom';
import { decodedToken } from '../../services';
import { DecodedToken } from '../../types/CouponTypes';

afterEach(() => {
  cleanup();
});
export const expectedOutput: DecodedToken = {
  id: 'string',
  email: 'string',
  userType: 'string',
  iat: 5,
  exp: 8
};
describe('JWT operation', () => {
  it('should return a passed information', () => {
    expect(decodedToken({ testData: expectedOutput })).toBe(expectedOutput);
  });

  it('should format the date and time correctly for a different time', () => {
    expect(decodedToken()).toBe(null);
  });
});
