import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// localStorageのモック
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('renders app header', () => {
    render(<App />);
    expect(screen.getByText('Todoアプリ')).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('新しいTodoを追加...');
    const addButton = screen.getByText('追加');

    fireEvent.change(input, { target: { value: '新しいTodo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('新しいTodo')).toBeInTheDocument();
    });
  });

  it('toggles todo completion status', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('新しいTodoを追加...');
    const addButton = screen.getByText('追加');

    fireEvent.change(input, { target: { value: 'テストTodo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
    });

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
  });

  it('deletes a todo', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('新しいTodoを追加...');
    const addButton = screen.getByText('追加');

    fireEvent.change(input, { target: { value: '削除するTodo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('削除するTodo')).toBeInTheDocument();
    });

    const deleteButton = screen.getByLabelText('削除');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('削除するTodo')).not.toBeInTheDocument();
    });
  });

  it('filters todos correctly', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('新しいTodoを追加...');
    const addButton = screen.getByText('追加');

    // 2つのTodoを追加
    fireEvent.change(input, { target: { value: '未完了Todo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('未完了Todo')).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: '完了Todo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // 2つ目のTodoを完了にする
    });

    // 未完了フィルターをクリック
    const activeFilter = screen.getByText('未完了');
    fireEvent.click(activeFilter);

    await waitFor(() => {
      expect(screen.getByText('未完了Todo')).toBeInTheDocument();
      expect(screen.queryByText('完了Todo')).not.toBeInTheDocument();
    });
  });

  it('displays todo statistics', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('新しいTodoを追加...');
    const addButton = screen.getByText('追加');

    fireEvent.change(input, { target: { value: 'Todo1' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/1件の未完了/)).toBeInTheDocument();
    });
  });
});
