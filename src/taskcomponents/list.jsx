import React from 'react';
import Task from './task';

const TaskList = ({ tasks, toggleTaskCompletion }) => {
  return (
    <div>
      {tasks.map(task => (
        <Task key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} />
      ))}
    </div>
  );
};

export default TaskList;
