import { Component } from 'react';
import { Spinner } from '../../../../shared/ui/Spinner/Spinner';
import type { MovieType } from '../../model/MovieType';
import { MovieCard } from '../MovieCard/MovieCard';

interface Props {
  movies: MovieType[];
  loading: boolean;
  errorMessage: null | string;
}

export class MoviesList extends Component<Props> {
  render() {
    const { loading, movies, errorMessage } = this.props;
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (loading) {
      return <Spinner />;
    }
    if (movies.length === 0) {
      return 'No films matching your request were found...';
    }
    return (
      <div className="border-t-3 pt-[1rem] pb-[1.5rem] h-full min-h-0 overflow-y-auto">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    );
  }
}
