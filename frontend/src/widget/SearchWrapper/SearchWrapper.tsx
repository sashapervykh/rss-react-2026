import { Component } from 'react';
import type { MovieType } from '../../entities/movie/model/MovieType';
import { SearchForm } from '../../features/search/ui/SearchForm';
import { MoviesList } from '../../entities/movie/ui/MoviesList/MoviesList';
import { getMoviesList } from '../../features/search/api/getMoviesList';
import Button from '../../shared/ui/Button/Button';
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary/ErrorBoundary';

interface State {
  movies: MovieType[];
  loading: boolean;
  errorMessage: null | string;
  renderKey: number;
}

export class SearchWrapper extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      errorMessage: null,
      renderKey: 0,
    };
  }

  render() {
    return (
      <div className="grid h-full min-h-0 grid-rows-[auto_auto_minmax(0,1fr)]">
        <h1 className="text-2xl font-bold text-sky-800 mb-[1rem]">
          Find Your Movie
        </h1>
        <div className="flex gap-[1rem] m-[0_auto_1rem_auto] border-black">
          <SearchForm
            handleSearch={this.handleSearch}
            errorMessage={this.state.errorMessage}
          />
          <Button
            text="Break!"
            handleClick={() => {
              this.setState((p) => ({
                ...p,
                errorMessage:
                  'The app is crashed due to click on testing button.',
              }));
            }}
          />
        </div>
        <ErrorBoundary key={this.state.renderKey}>
          <MoviesList
            movies={this.state.movies}
            loading={this.state.loading}
            errorMessage={this.state.errorMessage}
          />
        </ErrorBoundary>
      </div>
    );
  }

  handleSearch = async (query: string) => {
    this.setState((p) => ({
      ...p,
      loading: true,
      errorMessage: null,
      renderKey: p.renderKey + 1,
    }));
    try {
      const movies = await getMoviesList(query);
      this.setState({ loading: false, movies, errorMessage: null });
    } catch (error) {
      if (error instanceof Error) {
        this.setState((p) => ({ ...p, errorMessage: error.message }));
        return;
      }
      this.setState((p) => ({ ...p, errorMessage: 'Unknown app error' }));
    }
  };
}
