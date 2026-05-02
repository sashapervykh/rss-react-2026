export function getTypedMovies(data: unknown) {
    if (!data || typeof data !== 'object') { throw new Error('Object should be recevied from API!') }
    if (!("results" in data) || !Array.isArray(data.results)) { throw new Error('Results should be in response and should be an array!') }
    const typedMovies = data.results.map(movie => getTypedMovie(movie))
    return typedMovies
}

function getTypedMovie(movie: unknown) {
    if (!movie || typeof movie !== 'object') { throw new Error('Each movie should be an object!') }
    if (!("id" in movie) || typeof movie.id !== 'number') { throw new Error('Each movie should have an id!') }
    if (!("title" in movie) || typeof movie.title !== 'string') { throw new Error('Each movie should have a title!') }
    if (!("overview" in movie) || typeof movie.overview !== 'string') { throw new Error('Each movie should have an overview!') }
    return { id: movie.id, title: movie.title, description: movie.overview }
}