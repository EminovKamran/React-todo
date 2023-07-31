import React, { useState } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './todo-app.css';

function TodoApp() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  let maxId = 10;

  const stopTimer = (id) => {
    const { timerId } = todoData.find((el) => el.id === id);
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const updatedTodos = [...prevTodoData];
      updatedTodos[idx].isPlaying = false;
      return updatedTodos;
    });
    clearInterval(timerId);
  };

  const startTimer = (id) => {
    const { isPlaying } = todoData.find((el) => el.id === id);
    if (!isPlaying) {
      const timerId = setInterval(() => {
        setTodoData((prevTodoData) =>
          prevTodoData.map((todoItem) => {
            if (todoItem.id === id) {
              let timeLeft = todoItem.sec - 1;
              let minLeft = todoItem.min;
              if (minLeft > 0 && timeLeft === 0) {
                minLeft -= 1;
                timeLeft = 59;
              }
              if (timeLeft === 0 || timeLeft < 0) {
                timeLeft = 0;
                stopTimer(id);
              }
              return {
                ...todoItem,
                sec: timeLeft,
                min: minLeft,
              };
            }
            return todoItem;
          }),
        );
      }, 1000);
      setTodoData((prevTodoData) => {
        const idx = prevTodoData.findIndex((el) => el.id === id);
        const updatedTodos = [...prevTodoData];
        updatedTodos[idx].timerId = timerId;
        updatedTodos[idx].isPlaying = true;
        return updatedTodos;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'label') setLabel(value);
    else if (name === 'min') setMin(value);
    else if (name === 'sec') setSec(value);
  };

  // eslint-disable-next-line no-shadow,no-return-assign
  const createTodoItem = (description, min, sec) => ({
    description,
    state: 'active',
    id: (maxId += 1),
    createDate: new Date(),
    min,
    sec,
    timerId: null,
    isPlaying: false,
  });

  const toggleProperty = (arr, id) => {
    const idx = arr.findIndex((el) => el.id === id);
    const obj = { ...arr[idx] };
    obj.state = obj.state === 'active' ? 'completed' : 'active';
    return [...arr.slice(0, idx), obj, ...arr.slice(idx + 1)];
  };

  const onToggleStatus = (id) => {
    setTodoData((prevTodoData) => toggleProperty(prevTodoData, id));
  };

  const onDeleted = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      return [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)];
    });
  };

  // eslint-disable-next-line no-shadow
  const addItem = (text, min, sec) => {
    if (text.trim()) {
      const newItem = createTodoItem(text, min, sec);
      setTodoData((prevTodoData) => [...prevTodoData, newItem]);
    }
  };

  const useFilteredTask = (e) => {
    // eslint-disable-next-line no-shadow
    const filter = e.target.innerText.toLowerCase();
    setFilter(filter);
  };

  const getFilteredTasks = () => {
    if (filter === 'active') {
      return todoData.filter((el) => el.state === 'active');
    }
    if (filter === 'completed') {
      return todoData.filter((el) => el.state === 'completed');
    }
    return todoData;
  };

  const useClearCompleted = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.filter((el) => el.state !== 'completed'),
    );
  };

  const useNewTask = (e) => {
    e.preventDefault();
    addItem(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  const onEdit = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const updatedTodos = [...prevTodoData];
      updatedTodos[idx].state = 'editing';
      return updatedTodos;
    });
  };

  const useEditTask = (id, newLabel) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            state: 'active',
            description: newLabel,
          };
        }
        return elem;
      }),
    );
  };

  const todoCount = todoData.filter((el) => el.state === 'active').length;
  const filteredTasks = getFilteredTasks();

  return (
    <section className='todoapp'>
      <NewTaskForm
        handleChange={handleChange}
        useNewTask={useNewTask}
        label={label}
        min={min}
        sec={sec}
      />
      <section className='main'>
        <TaskList
          todos={filteredTasks}
          onToggleStatus={onToggleStatus}
          onDeleted={onDeleted}
          onEdit={onEdit}
          useEditTask={useEditTask}
          handleChange={handleChange}
          min={min}
          sec={sec}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          useFilteredTask={useFilteredTask}
          currentFilter={filter}
          useClearCompleted={useClearCompleted}
          todoCount={todoCount}
        />
      </section>
    </section>
  );
}

export default TodoApp;
