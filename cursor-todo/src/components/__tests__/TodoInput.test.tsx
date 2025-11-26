import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoInput from '../TodoInput';

describe('TodoInput', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  it('renders input and button', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    expect(screen.getByPlaceholderText('新しいTodoを追加...')).toBeInTheDocument();
    expect(screen.getByText('追加')).toBeInTheDocument();
  });

  it('calls onAddTodo when form is submitted with text', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText('新しいTodoを追加...');
    const button = screen.getByText('追加');

    fireEvent.change(input, { target: { value: '新しいTodo' } });
    fireEvent.click(button);

    expect(mockOnAddTodo).toHaveBeenCalledWith('新しいTodo');
    expect(input).toHaveValue('');
  });

  it('does not call onAddTodo when input is empty', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const button = screen.getByText('追加');

    fireEvent.click(button);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it('trims whitespace before adding todo', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText('新しいTodoを追加...');
    const button = screen.getByText('追加');

    fireEvent.change(input, { target: { value: '  新しいTodo  ' } });
    fireEvent.click(button);

    expect(mockOnAddTodo).toHaveBeenCalledWith('新しいTodo');
  });
});

