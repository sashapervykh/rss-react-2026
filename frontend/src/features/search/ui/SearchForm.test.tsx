import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchForm } from './SearchForm';
import { STORAGE_KEY } from '../constants/storageKey';
import { localStorageMock } from '../../../__tests__/localStorageMock';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('SearchForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('loads saved query from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('batman');

    render(<SearchForm errorMessage={null} handleSearch={vi.fn()} />);

    expect(screen.getByDisplayValue('batman')).toBeInTheDocument();
  });

  it('calls handleSearch on mount with saved value', () => {
    localStorageMock.getItem.mockReturnValue('spiderman');

    const handleSearch = vi.fn();

    render(<SearchForm errorMessage={null} handleSearch={handleSearch} />);

    expect(handleSearch).toHaveBeenCalledWith('spiderman');
  });

  it('updates input when user types', async () => {
    render(<SearchForm errorMessage={null} handleSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Enter movie...');

    await user.clear(input);
    await user.type(input, 'matrix');

    expect(input).toHaveValue('matrix');
  });

  it('submits trimmed query when user clicks search', async () => {
    const handleSearch = vi.fn();

    render(<SearchForm errorMessage={null} handleSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Enter movie...');

    await user.type(input, '   dune   ');

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(handleSearch).toHaveBeenCalledWith('dune');

    expect(localStorageMock.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'dune');
  });

  it('does not resubmit same value if no error exists', async () => {
    localStorageMock.getItem.mockReturnValue('joker');

    const handleSearch = vi.fn();

    render(<SearchForm errorMessage={null} handleSearch={handleSearch} />);

    const button = screen.getByRole('button', { name: /search/i });

    await user.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('forces submit when errorMessage exists', async () => {
    localStorageMock.getItem.mockReturnValue('joker');

    const handleSearch = vi.fn();

    render(<SearchForm errorMessage="API error" handleSearch={handleSearch} />);

    const button = screen.getByRole('button', { name: /search/i });

    await user.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(2);
  });

  it('starts with empty input when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(<SearchForm errorMessage={null} handleSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('Enter movie...')).toHaveValue('');
  });

  it('writes trimmed value to localStorage on submit', async () => {
    const handleSearch = vi.fn();

    render(<SearchForm errorMessage={null} handleSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Enter movie...');

    await user.type(input, '  inception  ');

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      'inception'
    );
  });
});
