import { http, HttpResponse } from 'msw';
import { API_ROUTES } from '../shared/constants/apiRoutes';
import { mockedApiResponse } from './mockedApiResponse';
import { TEST_REQUESTS } from './testRequests';

export const handlers = [
  http.get(`${API_ROUTES.BASE_URL}/${API_ROUTES.DISCOVER}?page=1`, async () => {
    return HttpResponse.json({ results: mockedApiResponse });
  }),
  http.get(
    `${API_ROUTES.BASE_URL}/${API_ROUTES.SEARCH}`,
    async ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get('query');

      switch (true) {
        case query === TEST_REQUESTS.NOT_FOUND: {
          return HttpResponse.json({
            results: [],
          });
        }
        case query === TEST_REQUESTS.SERVER_ERROR: {
          return new HttpResponse(
            JSON.stringify({ status_message: 'Server Error' }),
            { status: 500 }
          );
        }
        case query === TEST_REQUESTS.UNKNOWN_ERROR: {
          return new HttpResponse(JSON.stringify({ status: 'error' }), {
            status: 404,
          });
        }
        default: {
          return HttpResponse.json({
            results: mockedApiResponse.filter((movie) => movie.title === query),
          });
        }
      }
    }
  ),
];
