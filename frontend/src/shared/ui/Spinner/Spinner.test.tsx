import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
    it('renders spinner element', () => {
        render(<Spinner />);

        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
    });

    it('applies status role correctly for accessibility', () => {
        render(<Spinner />);

        const spinner = screen.getByRole('status');
        expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });
});