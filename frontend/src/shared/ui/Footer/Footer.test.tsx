import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Footer } from './Footer';
import { TMBD_NOTICE } from '../../constants/tmdbNotice';

vi.mock('../../../../public/tmdbLogo.svg', () => ({
  default: 'mock-tmdb-logo.svg',
}));

describe('Footer', () => {
  test('renders TMDB notice text', async () => {
    render(<Footer />);

    expect(screen.getByText(TMBD_NOTICE)).toBeInTheDocument();
  });

  test('renders API provider logo image', async () => {
    render(<Footer />);

    const img = screen.getByRole('img', { name: /api provider logo/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'mock-tmdb-logo.svg');

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
