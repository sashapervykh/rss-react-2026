import { API_ROUTES } from "../../../shared/constants/apiRoutes";
import { API_TOKEN } from "../../../shared/constants/apiToken";
import { getTypedMovies } from "../lib/getTypedMovies";

export async function getMoviesList(query: string) {
    const searchQuery = query === "" ? `${API_ROUTES.DISCOVER}?page=1` : `${API_ROUTES.SEARCH}?query=${query}&page=1`
    const response = await fetch(`${API_ROUTES.BASE_URL}/${searchQuery}`, {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        },
    })
    console.log(response)
    if (!response.ok) {
        throw new Error('Request to server failed. Try again later...')
    }

    const responseData: unknown = await response.json();
    console.log(responseData);
    const typedData = getTypedMovies(responseData);
    console.log(typedData);
    return typedData;
}
