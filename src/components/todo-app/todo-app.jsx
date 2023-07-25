import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './todo-app.css';

export default class TodoApp extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  maxId = 10;

  constructor(props) {
    super(props);

    this.state = {
      todoData: [],
      filter: 'all',
      label: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // eslint-disable-next-line no-return-assign
  createTodoItem = (description) => ({
    description,
    state: 'active',
    // eslint-disable-next-line react/no-unused-class-component-methods
    id: (this.maxId += 1),
    createDate: new Date(),
  });

  // eslint-disable-next-line class-methods-use-this
  toggleProperty = (arr, id) => {
    const idx = arr.findIndex((el) => el.id === id);

    const obj = { ...arr[idx] };

    obj.state = obj.state === 'active' ? 'completed' : 'active';

    return [...arr.slice(0, idx), obj, ...arr.slice(idx + 1)];
  };

  onToggleStatus = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id),
    }));
  };

  onDeleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  useFilteredTask = (e) => {
    const filter = e.target.innerText.toLowerCase();
    this.setState({ filter });
  };

  getFilteredTasks = () => {
    const { todoData, filter } = this.state;
    if (filter === 'active') {
      return todoData.filter((el) => el.state === 'active');
    }
    if (filter === 'completed') {
      return todoData.filter((el) => el.state === 'completed');
    }
    return todoData;
  };

  useClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((el) => el.state !== 'completed');

      return {
        todoData: newTodoData,
      };
    });
  };

  useNewTask = (e) => {
    e.preventDefault();
    const { label } = this.state;
    this.addItem(label);
    this.setState({
      label: '',
    });
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const updatedTodos = [...todoData];
      updatedTodos[idx].state = 'editing';

      return {
        todoData: updatedTodos,
      };
    });
  };

  useEditTask = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const updateLabel = todoData.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            state: 'active',
            description: newLabel,
          };
        }
        return elem;
      });

      return {
        todoData: updateLabel,
        newLabel: '',
      };
    });
  };

  render() {
    const { filter, label, todoData } = this.state;

    const todoCount = todoData.filter((el) => el.state === 'active').length;

    const filteredTasks = this.getFilteredTasks();

    return (
      <section className='todoapp'>
        <NewTaskForm
          handleChange={this.handleChange}
          useNewTask={this.useNewTask}
          label={label}
        />
        <section className='main'>
          <TaskList
            todos={filteredTasks}
            onToggleStatus={this.onToggleStatus}
            onDeleted={this.onDeleted}
            onEdit={this.onEdit}
            useEditTask={this.useEditTask}
            handleChange={this.handleChange}
          />
          <Footer
            useFilteredTask={this.useFilteredTask}
            currentFilter={filter}
            useClearCompleted={this.useClearCompleted}
            todoCount={todoCount}
          />
        </section>
      </section>
    );
  }
}
