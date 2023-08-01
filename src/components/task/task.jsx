import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskTimer from '../task-timer';
import './task.css';

function Task(props) {
  const {
    state,
    description,
    onToggleStatus,
    onDeleted,
    createDate,
    onEdit,
    min,
    sec,
    startTimer,
    stopTimer,
    id,
    setEditTask,
    resetTodo,
  } = props;

  const [newLabel, setNewLabel] = useState(description);

  const handleChange = (e) => {
    const { value } = e.target;
    setNewLabel(value);
  };

  const onTaskEdit = (e) => {
    e.preventDefault();
    setEditTask(id, newLabel);
  };

  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          defaultChecked={state !== 'active'}
          onClick={onToggleStatus}
        />
        <label>
          <span className='title'>{description}</span>
          <span className='description'>
            <TaskTimer
              startTimer={startTimer}
              stopTimer={stopTimer}
              min={min}
              sec={sec}
            />
          </span>
          <span className='created'>
            created {formatDistanceToNow(createDate, { includeSeconds: true })}{' '}
            ago
          </span>
        </label>
        <button
          type='button'
          aria-label='edit button'
          className='icon icon-edit'
          onClick={onEdit}
        />
        <button
          type='button'
          aria-label='destroy button'
          className='icon icon-destroy'
          onClick={onDeleted}
        />
      </div>
      <form onSubmit={onTaskEdit}>
        {state === 'editing' ? (
          <input
            type='text'
            name='newLabel'
            className='edit'
            onKeyDown={resetTodo}
            value={newLabel}
            onChange={handleChange}
          />
        ) : null}
      </form>
    </>
  );
}

export default Task;
