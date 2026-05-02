import type { MovieType } from "../../model/MovieType"
import { MovieCard } from "../MovieCard/MovieCard"

interface Props {
    movies: MovieType[]
}

export function MoviesList({ movies }: Props) {

    if (movies.length === 0) { return "No films matching your request were found..." }

    return <div>{movies.map((movie) => (<MovieCard key={movie.id} {...movie} />))}</div>
}