import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieCard } from './MovieCard';

const mockedMovie = {
    id: 1,
    title: 'Inception',
    description: 'A mind-bending thriller about dreams within dreams.',
};

describe('MovieCard', () => {
    it('renders movie title correctly', () => {
        render(<MovieCard {...mockedMovie} />);

        expect(
            screen.getByText("Title: Inception")
        ).toBeInTheDocument();
    });

    it('renders movie description correctly', () => {
        render(<MovieCard {...mockedMovie} />);

        expect(
            screen.getByText(mockedMovie.description)
        ).toBeInTheDocument();
    });
});