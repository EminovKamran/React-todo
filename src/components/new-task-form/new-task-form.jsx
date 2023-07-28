import React from 'react';

import './new-task-form.css';

function NewTaskForm(props) {
  const { useNewTask, handleChange, label, min, sec } = props;

  return (
    <form className='new-todo-form' onSubmit={useNewTask}>
      <header className='header'>
        <h1>todos</h1>
        <input
          name='label'
          className='new-todo'
          placeholder='What needs to be done?'
          onChange={handleChange}
          value={label}
          required
        />
        <input
          className='new-todo-form__timer'
          placeholder='Min'
          name='min'
          onChange={handleChange}
          value={min}
          required
        />
        <input
          className='new-todo-form__timer'
          placeholder='Sec'
          name='sec'
          onChange={handleChange}
          value={sec}
          required
        />
        <button type='submit' aria-label='submit-button' />
      </header>
    </form>
  );
}

export default NewTaskForm;
