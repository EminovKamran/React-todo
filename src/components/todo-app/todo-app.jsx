import React, { useState, useEffect, useRef } from 'react';

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
  const [maxId, setMaxId] = useState(10);

  const taskContainerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const taskContainer = taskContainerRef.current;

      if (!taskContainer.contains(event.target)) {
        const tasksWithoutEditing = todoData.map((task) =>
          task.state === 'editing' ? { ...task, state: 'active' } : task,
        );
        setTodoData(tasksWithoutEditing);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [todoData]);

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

  const createTodoItem = (description) => ({
    description,
    state: 'active',
    id: maxId,
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
    setTodoData(() => toggleProperty(todoData, id));
  };

  const onDeleted = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  const addItem = (text, newMin, newSec) => {
    if (text.trim()) {
      const newItem = createTodoItem(text, newMin, newSec);
      setTodoData(() => [...todoData, newItem]);
      setMaxId(() => maxId + 1);
    }
  };

  const useFilteredTask = (e) => {
    const filtered = e.target.innerText.toLowerCase();
    setFilter(filtered);
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
    setTodoData(() => todoData.filter((el) => el.state !== 'completed'));
  };

  const useNewTask = (e) => {
    e.preventDefault();
    addItem(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  const onEdit = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id);
      const updatedTodos = [...todoData];
      updatedTodos[idx].state = 'editing';
      return updatedTodos;
    });
  };

  const setEditTask = (id, newLabel) => {
    setTodoData(() =>
      todoData.map((elem) => {
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

  const resetTodo = (e) => {
    setTodoData(() =>
      todoData.map((el) => {
        if (e.keyCode === 27) {
          return { ...el, state: 'active' };
        }
        return el;
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
      <section className='main' ref={taskContainerRef}>
        <TaskList
          todos={filteredTasks}
          onToggleStatus={onToggleStatus}
          onDeleted={onDeleted}
          onEdit={onEdit}
          setEditTask={setEditTask}
          handleChange={handleChange}
          min={min}
          sec={sec}
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTodo={resetTodo}
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
