import React from 'react';

import './new-task-form.css';

function NewTaskForm({ useNewTask, handleChange, label }) {
  return (
    <form onSubmit={useNewTask}>
      <header className='header'>
        <h1>todos</h1>
        <input
          name='label'
          className='new-todo'
          placeholder='What needs to be done?'
          onChange={handleChange}
          value={label}
        />
      </header>
    </form>
  );
}

export default NewTaskForm;
