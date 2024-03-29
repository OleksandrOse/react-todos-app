import React from 'react';
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AddTodoForm } from './components/AddTodoForm';

import { Footer } from './components/Footer';
import { TodoItem } from './components/TodoItem';
import { TodosContext } from './utils/TodosContext';

import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const todoActions = useContext(TodosContext);
  const { type = Filter.all } = useParams<{ type: Filter }>();
  const navigate = useNavigate();

  const todos = todoActions.getAll();
  const visibleTodos = todoActions.getAll(type);
  const activeTodos = todoActions.getAll(Filter.active);
  const hasActiveTodos = activeTodos.length > 0;

  const toggleAll = () => {
    todoActions.toggleAll(hasActiveTodos);
  };

  const clearCompleted = () => {
    todoActions.clearCompleted();
    navigate(`/${Filter.all}`);
  };


  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodoForm addTodo={todoActions.add} />
      </header>

      <section className="main">
        {todos.length > 0 && (
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={!hasActiveTodos}
              onChange={toggleAll}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
              {visibleTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={todoActions.remove}
                  onUpdate={todoActions.update}
                />
              ))}
            </ul>
          </section>
        )}
      </section>

      {todos.length > 0 && (
        <Footer
          itemsLeft={activeTodos.length}
          clearCompleted={clearCompleted}
        />
      )}
    </div>
  );
};
