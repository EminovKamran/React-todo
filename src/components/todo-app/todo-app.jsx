import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './todo-app.css';

export default class TodoApp extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  maxId = 10;

  timer;

  constructor(props) {
    super(props);

    this.state = {
      todoData: [],
      filter: 'all',
      label: '',
      min: '',
      sec: '',
      isPlaying: false,
    };
  }

  stopTimer = () => {
    this.setState({
      isPlaying: false,
    });
    clearInterval(this.timer);
  };

  startTimer = (id) => {
    const { isPlaying } = this.state;
    if (!isPlaying) {
      this.timer = setInterval(() => {
        this.setState((prevState) => {
          const updateTodo = prevState.todoData.map((todoItem) => {
            if (todoItem.id === id) {
              let timeLeft = todoItem.sec - 1;
              let minLeft = todoItem.min;
              if (minLeft > 0 && timeLeft === 0) {
                minLeft -= 1;
                timeLeft = 59;
              }
              if (timeLeft === 0 || timeLeft < 0) {
                timeLeft = 0;
                this.stopTimer();
              }
              return {
                ...todoItem,
                sec: timeLeft,
                min: minLeft,
              };
            }
            return todoItem;
          });
          return {
            todoData: updateTodo,
            isPlaying: true,
          };
        });
      }, 1000);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // eslint-disable-next-line no-return-assign
  createTodoItem = (description, min, sec) => ({
    description,
    state: 'active',
    // eslint-disable-next-line react/no-unused-class-component-methods
    id: (this.maxId += 1),
    createDate: new Date(),
    min,
    sec,
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

  addItem = (text, min, sec) => {
    if (text.trim()) {
      const newItem = this.createTodoItem(text, min, sec);

      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];

        return {
          todoData: newArr,
        };
      });
    }
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
    const { label, min, sec } = this.state;
    this.addItem(label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
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
    const { filter, label, todoData, min, sec } = this.state;

    const todoCount = todoData.filter((el) => el.state === 'active').length;

    const filteredTasks = this.getFilteredTasks();

    return (
      <section className='todoapp'>
        <NewTaskForm
          handleChange={this.handleChange}
          useNewTask={this.useNewTask}
          label={label}
          min={min}
          sec={sec}
        />
        <section className='main'>
          <TaskList
            todos={filteredTasks}
            onToggleStatus={this.onToggleStatus}
            onDeleted={this.onDeleted}
            onEdit={this.onEdit}
            useEditTask={this.useEditTask}
            handleChange={this.handleChange}
            min={min}
            sec={sec}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
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
