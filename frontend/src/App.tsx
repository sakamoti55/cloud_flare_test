import React, { useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Todo List</h1>
          <p className="subtitle">タスクを整理して効率的に進めましょう</p>
        </header>

        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="新しいタスクを入力..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            追加
          </button>
        </div>

        {totalCount > 0 && (
          <div className="stats">
            <span>合計: {totalCount}</span>
            <span>完了: {completedCount}</span>
            <span>残り: {totalCount - completedCount}</span>
          </div>
        )}

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>📋 タスクがありません</p>
              <p>上のフィールドから新しいタスクを追加してください</p>
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                  aria-label="削除"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="actions">
            <button
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              className="clear-completed"
              disabled={completedCount === 0}
            >
              完了したタスクを削除
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
