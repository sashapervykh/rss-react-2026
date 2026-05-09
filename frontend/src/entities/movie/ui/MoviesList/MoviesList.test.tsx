import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MoviesList } from './MoviesList';
import { mockedMovies } from '../../../../__tests__/mockedMovies';
import { ErrorBoundary } from '../../../../shared/ui/ErrorBoundary/ErrorBoundary';


vi.mock('../../../../shared/ui/Spinner/Spinner', () => ({
    Spinner: () => <div role="status">Loading...</div>,
}));

vi.mock('../MovieCard/MovieCard', () => ({
    MovieCard: ({ title }: { title: string }) => (
        <div data-testid="movie-card">{title}</div>
    ),
}));

describe('MoviesList', () => {
    it('renders spinner when loading is true', () => {
        render(
            <MoviesList
                movies={[]}
                loading={true}
                errorMessage={null}
            />
        );

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('displays "no results" message when data array is empty', () => {
        render(
            <MoviesList
                movies={[]}
                loading={false}
                errorMessage={null}
            />
        );

        expect(
            screen.getByText('No films matching your request were found...')
        ).toBeInTheDocument();
    });

    it('renders correct number of items when data is provided', () => {
        const { getAllByTestId } = render(
            <MoviesList
                movies={mockedMovies}
                loading={false}
                errorMessage={null}
            />
        );

        const cards = getAllByTestId('movie-card');

        expect(cards).toHaveLength(2);
    });

    it('renders list of movies correctly', () => {
        render(
            <MoviesList
                movies={mockedMovies}
                loading={false}
                errorMessage={null}
            />
        );

        expect(screen.getByText(mockedMovies[0].title)).toBeInTheDocument();
        expect(screen.getByText(mockedMovies[1].title)).toBeInTheDocument();
    });

    it('throws error when errorMessage exists and is handled by ErrorBoundary', () => {
        vi.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <ErrorBoundary>
                <MoviesList
                    movies={[]}
                    loading={false}
                    errorMessage="API failed"
                />
            </ErrorBoundary>
        );

        expect(
            screen.getByText("API failed")
        ).toBeInTheDocument();
    });
});