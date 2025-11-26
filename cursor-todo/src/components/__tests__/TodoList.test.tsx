import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';
import { Todo, FilterType } from '../../types';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: '1', text: '未完了Todo1', completed: false },
    { id: '2', text: '完了Todo1', completed: true },
    { id: '3', text: '未完了Todo2', completed: false },
  ];

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  it('renders all todos when filter is "all"', () => {
    render(
      <TodoList
        todos={mockTodos}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('未完了Todo1')).toBeInTheDocument();
    expect(screen.getByText('完了Todo1')).toBeInTheDocument();
    expect(screen.getByText('未完了Todo2')).toBeInTheDocument();
  });

  it('renders only active todos when filter is "active"', () => {
    render(
      <TodoList
        todos={mockTodos}
        filter="active"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('未完了Todo1')).toBeInTheDocument();
    expect(screen.getByText('未完了Todo2')).toBeInTheDocument();
    expect(screen.queryByText('完了Todo1')).not.toBeInTheDocument();
  });

  it('renders only completed todos when filter is "completed"', () => {
    render(
      <TodoList
        todos={mockTodos}
        filter="completed"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('完了Todo1')).toBeInTheDocument();
    expect(screen.queryByText('未完了Todo1')).not.toBeInTheDocument();
    expect(screen.queryByText('未完了Todo2')).not.toBeInTheDocument();
  });

  it('displays empty message when no todos match filter', () => {
    render(
      <TodoList
        todos={[]}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText(/Todoがありません/)).toBeInTheDocument();
  });

  it('displays appropriate empty message for active filter', () => {
    const completedTodos: Todo[] = [
      { id: '1', text: '完了Todo', completed: true },
    ];
    render(
      <TodoList
        todos={completedTodos}
        filter="active"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText(/未完了のTodoがありません/)).toBeInTheDocument();
  });

  it('displays appropriate empty message for completed filter', () => {
    const activeTodos: Todo[] = [
      { id: '1', text: '未完了Todo', completed: false },
    ];
    render(
      <TodoList
        todos={activeTodos}
        filter="completed"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText(/完了したTodoがありません/)).toBeInTheDocument();
  });
});

