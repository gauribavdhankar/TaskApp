import React, { useState, useEffect, useCallback, useRef} from 'react';
import TaskList from './taskcomponents/list';
import TaskForm from './taskcomponents/taskform';


// Custom Hook for Local Storage
const useLocalStorage = (key, initialValue) => {
  const storedValue = JSON.parse(localStorage.getItem(key));
  const [value, setValue] = useState(storedValue !== null ? storedValue : initialValue);
  const setStoredValue = newValue => {
    setValue(newValue);
    if(newValue !== null && newValue !== undefined){
    localStorage.setItem(key, JSON.stringify(newValue));
    }else{
      localStorage.removeItem(key);
  }
};
   return [value, setStoredValue];
};

const App = () => {
  //state-task
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  //state-filter
  const [filter, setFilter] = useState('all');

  const inputRef = useRef(null);

  //update doc title
  useEffect(() => {
    document.title = `Incomplete Tasks: ${tasks.filter(task => !task.completed).length}`;
  }, [tasks]);

  // Toggle Task Completion function using useCallback and setTasks by calling in dependancies
  const toggleTaskCompletion = useCallback(
    id => {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  //adding task as new
  const addTask = useCallback(
    text => {
      setTasks(prevTasks => [...prevTasks, { id: Date.now(), text, completed: false }]);
    },
    [setTasks]
  );

  // Filter Tasks based on Completion Status
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  // Focus on input field when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    
    <div className="App">
        <div>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} inputRef={inputRef} />
      <div className='btn'>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <TaskList tasks={filteredTasks} toggleTaskCompletion={toggleTaskCompletion} />
    </div>
    </div>
  );
};

export default App;