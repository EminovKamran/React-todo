import React from 'react';

import './tasks-filter.css';

function TasksFilter({ useFilteredTask, currentFilter }) {
  return (
    <ul className='filters'>
      <li>
        <button
          type='button'
          className={currentFilter === 'all' ? 'selected' : ''}
          onClick={useFilteredTask}
        >
          All
        </button>
      </li>
      <li>
        <button
          type='button'
          className={currentFilter === 'active' ? 'selected' : ''}
          onClick={useFilteredTask}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type='button'
          className={currentFilter === 'completed' ? 'selected' : ''}
          onClick={useFilteredTask}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TasksFilter;
