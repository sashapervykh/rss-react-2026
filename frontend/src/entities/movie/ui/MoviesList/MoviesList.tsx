import type { MovieType } from '../../model/MovieType';
import { MovieCard } from '../MovieCard/MovieCard';

interface Props {
  movies: MovieType[];
  loading: boolean;
}

export function MoviesList({ movies, loading }: Props) {
  if (loading) {
    return 'Loading movies...';
  }
  if (movies.length === 0) {
    return 'No films matching your request were found...';
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
}
