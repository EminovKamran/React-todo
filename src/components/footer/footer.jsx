import React from 'react';

import TasksFilter from '../tasks-filter';

import './footer.css';

function Footer({
  useFilteredTask,
  currentFilter,
  useClearCompleted,
  todoCount,
}) {
  return (
    <footer className='footer'>
      <span>items</span>
      <span className='todo-count'>{todoCount} items left</span>
      <button
        type='button'
        className='clear-completed'
        onClick={useClearCompleted}
      >
        Clear completed
      </button>
      <TasksFilter
        useFilteredTask={useFilteredTask}
        currentFilter={currentFilter}
      />
    </footer>
  );
}

export default Footer;
