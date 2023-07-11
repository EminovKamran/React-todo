// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

import Task from '../task';

import './task-list.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class TaskList extends Component {
  render() {
    const { todos, onToggleStatus, onDeleted, onEdit, useEditTask } =
      this.props;

    const elements = todos.map((item) => {
      const { id, description, ...itemsProps } = item;

      return (
        <li key={item.id} className={item.state}>
          <Task
            {...itemsProps}
            onToggleStatus={() => onToggleStatus(id)}
            onDeleted={() => onDeleted(id)}
            onEdit={() => onEdit(id)}
            useEditTask={(e) => useEditTask(e, id)}
            description={description || this.props.description}
          />
        </li>
      );
    });
    return <ul className='todo-list'>{elements}</ul>;
  }
}

TaskList.defaultProps = {
  description: 'Kata Academy',
};
