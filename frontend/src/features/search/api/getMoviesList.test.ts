import { describe, it, expect } from 'vitest';
import { getMoviesList } from './getMoviesList';
import { mockedMovies } from '../../../__tests__/mockedMovies';
import { TEST_REQUESTS } from '../../../__tests__/testRequests';

describe('getMoviesList (MSW)', () => {
  it('returns all movies when query is empty', async () => {
    const result = await getMoviesList('');

    expect(result).toEqual(mockedMovies);
  });

  it('returns search results for query when query is provided', async () => {
    const result = await getMoviesList('Inception');

    expect(result).toEqual([mockedMovies[0]]);
  });

  it('returns empty array when movies are not found', async () => {
    const result = await getMoviesList(TEST_REQUESTS.NOT_FOUND);

    expect(result).toEqual([]);
  });
  it('returns correct message for server error', async () => {
    expect(getMoviesList(TEST_REQUESTS.SERVER_ERROR)).rejects.toThrow(`Request to server failed. Server response is [Server Error]. Try again later...`);
  });
  it('returns fallback message for unknown server error', async () => {
    expect(getMoviesList(TEST_REQUESTS.UNKNOWN_ERROR)).rejects.toThrow(`Request to server failed. Server response is [Unknown server error]. Try again later...`);
  });
});