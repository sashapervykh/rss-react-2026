import { Component } from 'react';
import type { MovieType } from '../../entities/movie/model/MovieType';
import { SearchForm } from '../../features/search/ui/SearchForm';
import { MoviesList } from '../../entities/movie/ui/MoviesList/MoviesList';
import { getMoviesList } from '../../features/search/api/getMoviesList';
import Button from '../../shared/ui/Button/Button';

interface State {
  movies: MovieType[];
  loading: boolean;
  error: null | Error;
}

interface Props {
  testingError: boolean;
  resetError: () => void;
}

export class SearchWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { movies: [], loading: true, error: null };
  }

  render() {
    if (this.props.testingError) {
      throw new Error('You have thrown testing error.');
    }
    if (this.state.error) {
      throw this.state.error;
    }
    return (
      <>
        <h1>Find Your Movie</h1>
        <div>
          <SearchForm handleSearch={this.handleSearch} />
          <Button text="Break!" handleClick={() => { this.setState(p => ({ ...p, error: new Error("The app is crached due to click on testing button.") })) }} />
        </div>

        <MoviesList movies={this.state.movies} loading={this.state.loading} />
      </>
    );
  }

  handleSearch = async (query: string) => {
    this.setState((p) => ({ ...p, loading: true, error: null }));
    try {
      const movies = await getMoviesList(query);
      this.setState({ loading: false, movies, error: null });
    } catch (error) {
      if (error instanceof Error) {
        this.setState((p) => ({ ...p, error: error }));
        return;
      }
      this.setState((p) => ({ ...p, error: new Error('Unknown error') }));
    }
  };
}
