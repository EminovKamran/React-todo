import React from 'react';
import { createRoot } from 'react-dom/client';

import TodoApp from './components/todo-app';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
);
