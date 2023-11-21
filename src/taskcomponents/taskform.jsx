import React, { useState } from 'react';

const TaskForm = ({ addTask, inputRef }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (taskText.trim() !== '') {
      addTask(taskText);
      setTaskText('');
    }
  };

  return (
    <form className="form-cls" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        ref={inputRef}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
