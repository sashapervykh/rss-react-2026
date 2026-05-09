import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
    const messageProp = "Network error occurred";
    it('renders main error message', () => {
        render(<ErrorFallback message={messageProp} />);
        const mainMessage = screen.getByText('Something went wrong... Search again to reset error')
        expect(mainMessage).toBeInTheDocument();
    });

    it('renders error information label', () => {
        render(<ErrorFallback message={messageProp} />);
        const errorInformationLabel = screen.getByText("Error Information:")
        expect(errorInformationLabel).toBeInTheDocument();
    });

    it('displays provided error message prop', () => {
        render(<ErrorFallback message={messageProp} />);
        const errorMessage = screen.getByText(messageProp)
        expect(errorMessage).toBeInTheDocument();
    });
});