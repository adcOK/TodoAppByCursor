import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../TodoItem';
import { Todo } from '../../types';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'テストTodo',
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  it('renders todo text', () => {
    render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    expect(screen.getByText('テストTodo')).toBeInTheDocument();
  });

  it('renders checkbox unchecked when todo is not completed', () => {
    render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox checked when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    const deleteButton = screen.getByLabelText('削除');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});

