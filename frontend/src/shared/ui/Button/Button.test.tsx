import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  test('renders button with correct text', () => {
    render(<Button text="Click me" />);

    const button = screen.getByRole('button', {
      name: 'Click me',
    });

    expect(button).toBeInTheDocument();
  });

  test('calls handleClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button text="Click me" handleClick={handleClick} />);

    const button = screen.getByRole('button', {
      name: /click me/i,
    });

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has correct default type attribute', () => {
    render(<Button text="Click me" />);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'button');
  });

  test('applies custom type when provided', () => {
    render(<Button text="Submit" type="submit" />);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'submit');
  });
});
