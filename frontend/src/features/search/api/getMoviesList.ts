import { API_ROUTES } from '../../../shared/constants/apiRoutes';
import { API_TOKEN } from '../../../shared/constants/apiToken';
import { getErrorMessage } from '../lib/getErrorMessage';
import { getTypedMovies } from '../lib/getTypedMovies';

export async function getMoviesList(query: string) {
  try {
    const searchQuery =
      query === ''
        ? `${API_ROUTES.DISCOVER}?page=1`
        : `${API_ROUTES.SEARCH}?query=${query}&page=1`;
    const response = await fetch(`${API_ROUTES.BASE_URL}/${searchQuery}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    if (!response.ok) {
      const errorObject = await response.json();
      const errorMessage = getErrorMessage(errorObject)
      throw new Error(errorMessage);
    }
    const responseData: unknown = await response.json();
    const typedData = getTypedMovies(responseData);
    return typedData;
  } catch (err) {
    let message: string = 'Unknown server error happened. Try again later...';
    if (err instanceof Error) {
      message = `Request to server failed. Server respose is [${err.message}]. Try again later...`;
    }
    throw new Error(message)
  }
}
