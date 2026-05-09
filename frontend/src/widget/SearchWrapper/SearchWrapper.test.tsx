import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchWrapper } from './SearchWrapper';
import { getMoviesList } from '../../features/search/api/getMoviesList';
import { mockedMovies } from '../../__tests__/mockedMovies';

const mockedGetMoviesList = vi.mocked(getMoviesList);

vi.mock('../../features/search/api/getMoviesList', () => ({
  getMoviesList: vi.fn(),
}));

vi.mock('../../features/search/ui/SearchForm', () => ({
  SearchForm: ({ handleSearch }: { handleSearch: (query: string) => void }) => (
    <button onClick={() => handleSearch('batman')}>Mock Search</button>
  ),
}));

vi.mock('../../shared/ui/Button/Button', () => ({
  default: ({
    handleClick,
    text,
  }: {
    handleClick: () => void;
    text: string;
  }) => <button onClick={handleClick}>{text}</button>,
}));

vi.mock('../../entities/movie/ui/MoviesList/MoviesList', () => ({
  MoviesList: ({
    movies,
    loading,
    errorMessage,
  }: {
    movies: unknown[];
    loading: boolean;
    errorMessage: string | null;
  }) => {
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    return (
      <div>
        <div data-testid="loading">{loading ? 'loading' : 'done'}</div>
        <div data-testid="movies-count">{movies.length}</div>
      </div>
    );
  },
}));

describe('SearchWrapper', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial layout correctly', () => {
    render(<SearchWrapper />);

    expect(screen.getByText(/find your movie/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching movies', async () => {
    mockedGetMoviesList.mockImplementation(() => new Promise(() => {}));

    render(<SearchWrapper />);

    await user.click(screen.getByText('Mock Search'));

    expect(screen.getByTestId('loading')).toHaveTextContent('loading');
  });

  it('loads movies after successful search', async () => {
    mockedGetMoviesList.mockResolvedValue([
      { id: 1, title: 'Batman', description: 'Dark Knight' },
    ]);

    render(<SearchWrapper />);

    await user.click(screen.getByText('Mock Search'));

    expect(getMoviesList).toHaveBeenCalledWith('batman');

    expect(screen.getByTestId('movies-count')).toHaveTextContent('1');
  });

  it('handles API error correctly', async () => {
    mockedGetMoviesList.mockRejectedValue(new Error('API failed'));

    render(<SearchWrapper />);

    await user.click(screen.getByText('Mock Search'));

    expect(screen.getByText('API failed')).toBeInTheDocument();
  });

  it('handles unknown error type', async () => {
    mockedGetMoviesList.mockRejectedValue('UNKNOWN');

    render(<SearchWrapper />);

    await user.click(screen.getByText('Mock Search'));

    expect(screen.getByText('Unknown app error')).toBeInTheDocument();
  });

  it('triggers error boundary via Break button', async () => {
    render(<SearchWrapper />);

    await user.click(screen.getByText('Break!'));

    expect(
      screen.getByText('The app is crashed due to click on testing button.')
    ).toBeInTheDocument();
  });

  it('resets error and triggers new search correctly', async () => {
    mockedGetMoviesList.mockRejectedValueOnce(new Error('API failed'));

    mockedGetMoviesList.mockResolvedValueOnce(mockedMovies);

    render(<SearchWrapper />);

    await user.click(screen.getByText('Mock Search'));
    expect(screen.getByText('API failed')).toBeInTheDocument();
    await user.click(screen.getByText('Mock Search'));

    expect(screen.getByTestId('movies-count')).toHaveTextContent('2');
    expect(getMoviesList).toHaveBeenCalledTimes(2);
  });
});
