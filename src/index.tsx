import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { App } from './App';
import { TodosProvider } from './utils/TodosContext';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path=":type" element={<App />} />
        </Route>
      </Routes>
    </Router>
  </TodosProvider>
);
