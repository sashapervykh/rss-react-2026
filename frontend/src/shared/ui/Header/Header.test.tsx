import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  test('renders header element with correct role', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
  test('renders app title "CinemaCity"', () => {
    render(<Header />);

    const title = screen.getByText('CinemaCity');
    expect(title).toBeInTheDocument();
  });
});
