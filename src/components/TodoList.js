import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import './customStyles.css';

function TodoList({ tasks, onToggleCompletion, onDeleteTask, onUpdateTask }) {
  // console.log('Received tasks in TodoList:', tasks); // Add this line for debugging

  // Sort tasks based on priority (low -> medium -> high)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ul>
      {sortedTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleCompletion={onToggleCompletion}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  );
}

export default TodoList;
