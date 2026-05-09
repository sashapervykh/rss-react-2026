import { describe, it, expect } from 'vitest';
import { getTypedMovies } from './getTypedMovies';
import { mockedApiResponse } from '../../../__tests__/mockedApiResponse';
import { mockedMovies } from '../../../__tests__/mockedMovies';

describe('getTypedMovies', () => {
  it('throws error when data is null', () => {
    expect(() => getTypedMovies(null)).toThrow(
      'Object should be recevied from API!'
    );
  });

  it('throws error when data is not an object (string)', () => {
    expect(() => getTypedMovies('invalid')).toThrow(
      'Object should be recevied from API!'
    );
  });

  it('throws error when data is not an object (number)', () => {
    expect(() => getTypedMovies(123)).toThrow(
      'Object should be recevied from API!'
    );
  });

  it('throws when results field is missing', () => {
    expect(() => getTypedMovies({})).toThrow(
      'Results should be in response and should be an array!'
    );
  });

  it('throws when results is not an array', () => {
    expect(() =>
      getTypedMovies({ results: 'not-array' })
    ).toThrow(
      'Results should be in response and should be an array!'
    );
  });

  it('throws when movie is not an object', () => {
    expect(() =>
      getTypedMovies({ results: [null] })
    ).toThrow('Each movie should be an object!');
  });

  it('throws when movie has no id', () => {
    expect(() =>
      getTypedMovies({
        results: [{ title: 'A', overview: 'B' }],
      })
    ).toThrow('Each movie should have an id!');
  });

  it('throws when movie has no title', () => {
    expect(() =>
      getTypedMovies({
        results: [{ id: 1, overview: 'B' }],
      })
    ).toThrow('Each movie should have a title!');
  });

  it('throws when movie has no overview', () => {
    expect(() =>
      getTypedMovies({
        results: [{ id: 1, title: 'A' }],
      })
    ).toThrow('Each movie should have an overview!');
  });

  it('correctly transforms valid movies', () => {
    const result = getTypedMovies({
      results: mockedApiResponse,
    });

    expect(result).toEqual(mockedMovies);
  });
});