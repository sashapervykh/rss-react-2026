import { API_ROUTES } from "../../../shared/constants/apiRoutes";
import { API_TOKEN } from "../../../shared/constants/apiToken";
import { getTypedMovies } from "../lib/getTypedMovies";

export async function getMoviesList(query: string) {
    const searchQuery = query === "" ? `page=1` : `query=${query}&page=1`
    const response = await fetch(`${API_ROUTES.BASE_URL}/${API_ROUTES.SEARCH}?${searchQuery}`, {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        },
    })

    if (!response.ok) {
        throw new Error('Request to server failed. Try again later...')
    }

    const responseData: unknown = await response.json()
    const typedData = getTypedMovies(responseData);
    return typedData;
}
