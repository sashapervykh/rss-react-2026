import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import { FALLBACK_ERROR_MESSAGE } from '../../constants/fallbackErrorMessage';

const ProblemChild = () => {
  throw new Error('Test Error');
};

const ProblemEmptyErrorChild = () => {
  throw new Error();
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Healthy Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Healthy Component')).toBeInTheDocument();
  });

  it('renders ErrorFallback when child throws error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const mainErrorMessage = screen.getByText(
      'Something went wrong... Search again to reset error'
    );
    expect(mainErrorMessage).toBeInTheDocument();
  });

  it('passes error message to ErrorFallback', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('logs error to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
  it('logs fallback message when error is undefined', () => {
    render(
      <ErrorBoundary>
        <ProblemEmptyErrorChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(FALLBACK_ERROR_MESSAGE)).toBeInTheDocument();
  });
});
