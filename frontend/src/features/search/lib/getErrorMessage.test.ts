import { describe, it, expect } from 'vitest';
import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('throws error when data is null', () => {
    expect(() => getErrorMessage(null)).toThrow(
      'Object should be recevied from API!'
    );
  });

  it('throws error when data is not an object (string)', () => {
    expect(() => getErrorMessage('invalid')).toThrow(
      'Object should be recevied from API!'
    );
  });

  it('throws error when data is not an object (number)', () => {
    expect(() => getErrorMessage(123)).toThrow(
      'Object should be recevied from API!'
    );
  });

  it('returns fallback message when status_message is missing', () => {
    const result = getErrorMessage({});

    expect(result).toBe('Unknown server error');
  });

  it('returns fallback message when status_message is not a string', () => {
    const result = getErrorMessage({
      status_message: 123,
    });

    expect(result).toBe('Unknown server error');
  });

  it('returns status_message when valid object is provided', () => {
    const result = getErrorMessage({
      status_message: 'API request failed',
    });

    expect(result).toBe('API request failed');
  });
});