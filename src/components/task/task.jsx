// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newLabel: props.description,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onTaskEdit = (e) => {
    const { id, useEditTask } = this.props;
    const { newLabel } = this.state;

    e.preventDefault();
    useEditTask(id, newLabel);
  };

  render() {
    const {
      state,
      description,
      onToggleStatus,
      onDeleted,
      createDate,
      onEdit,
    } = this.props;

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
            <span className='description'>{description}</span>
            <span className='created'>
              created{' '}
              {formatDistanceToNow(createDate, { includeSeconds: true })} ago
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
        <form onSubmit={this.onTaskEdit}>
          {state === 'editing' ? (
            <input
              type='text'
              name='newLabel'
              className='edit'
              value={this.state.newLabel}
              onChange={this.handleChange}
            />
          ) : null}
        </form>
      </>
    );
  }
}
