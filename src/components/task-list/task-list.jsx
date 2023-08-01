import React from 'react';

import Task from '../task';

import './task-list.css';

function TaskList(props) {
  const {
    todos,
    onToggleStatus,
    onDeleted,
    onEdit,
    setEditTask,
    startTimer,
    stopTimer,
    resetTodo,
  } = props;

  const elements = todos.map((item) => {
    const { id, description, ...itemsProps } = item;

    return (
      <li key={item.id} className={item.state}>
        <Task
          {...itemsProps}
          id={id}
          onToggleStatus={() => onToggleStatus(id)}
          onDeleted={() => onDeleted(id)}
          onEdit={() => onEdit(id)}
          setEditTask={setEditTask}
          description={description}
          startTimer={() => startTimer(id)}
          stopTimer={() => stopTimer(id)}
          resetTodo={(e) => resetTodo(e, id)}
        />
      </li>
    );
  });
  return <ul className='todo-list'>{elements}</ul>;
}

export default TaskList;
