<!-- 51a32f1d-1474-4cc3-a04a-4d03b2e5914b 920ffb14-33e8-41aa-9bf6-5e5491101af6 -->
# Todoアプリ実装計画

## 概要

案1のTodoアプリ（React + TypeScript）を実装します。基本機能、拡張機能、テストを含む完全な実装を行います。

## 実装ステップ

### 1. プロジェクトセットアップ

- `create-react-app`でTypeScriptテンプレートのプロジェクトを作成
- 必要な依存関係の確認とインストール
- プロジェクト構造の確認

### 2. 基本Todo機能の実装（10分相当）

- `src/components/TodoList.tsx`: Todoリスト表示コンポーネント
- `src/components/TodoItem.tsx`: 個別のTodoアイテムコンポーネント
- `src/components/TodoInput.tsx`: Todo追加用の入力コンポーネント
- `src/App.tsx`: メインアプリコンポーネント（状態管理）
- Todoアイテムの追加機能
- Todoアイテムの削除機能
- 完了状態の切り替え機能

### 3. 機能拡張の実装（10分相当）

- `src/hooks/useLocalStorage.ts`: ローカルストレージ用カスタムフック
- フィルタリング機能（全て/未完了/完了）の追加
- ローカルストレージへの保存機能
- CSSアニメーションの追加（フェードイン、削除時のアニメーション）

### 4. スタイリング

- `src/App.css`: メインスタイル
- `src/components/TodoItem.css`: Todoアイテムのスタイル
- モダンで使いやすいUIデザイン

### 5. テストの追加（10分相当）

- `src/components/__tests__/TodoList.test.tsx`: TodoListコンポーネントのテスト
- `src/components/__tests__/TodoItem.test.tsx`: TodoItemコンポーネントのテスト
- `src/App.test.tsx`: メインアプリのテスト

### 6. ドキュメント更新

- `README.md`: プロジェクトの説明、セットアップ手順、実行方法を記載

## 実装する主要ファイル

- `src/App.tsx` - メインアプリケーションコンポーネント
- `src/components/TodoList.tsx` - Todoリストコンポーネント
- `src/components/TodoItem.tsx` - Todoアイテムコンポーネント
- `src/components/TodoInput.tsx` - Todo入力コンポーネント
- `src/hooks/useLocalStorage.ts` - ローカルストレージフック
- `src/App.css` - スタイル
- テストファイル群

## 技術スタック

- React 18+
- TypeScript
- CSS（アニメーション含む）
- React Testing Library（テスト用）

### To-dos

- [ ] 型定義とカスタムフック（useLocalStorage）を作成
- [ ] TodoInput、TodoItem、TodoListコンポーネントを作成
- [ ] App.tsxを更新してメイン機能を実装
- [ ] スタイル（CSS）を追加してモダンなUIを実装
- [ ] テストファイルを作成
- [ ] README.mdを更新