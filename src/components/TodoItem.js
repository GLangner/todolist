import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ task, onToggleCompletion, onDeleteTask, onUpdateTask }) {
  // console.log('Received task in TodoItem:', task);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
  );
  const [editedCategory, setEditedCategory] = useState(task.category); // New state for edited category
  const [editedPriority, setEditedPriority] = useState(task.priority); // New state for edited priority

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedTask = {
      ...task,
      text: editedText,
      category: editedCategory,
      priority: editedPriority, // Include priority
      dueDate: editedDueDate ? new Date(`${editedDueDate}T00:00:00`) : null,
    };
    onUpdateTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleCompletion(task.id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="">No Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <div className="task-info">
          {task.category && (
              <span className="task-category">Category: {task.category}</span>
            )}
          {task.priority && (
            <span className="task-priority">Priority: {task.priority}</span>
          )}
            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
          </div>
          {task.dueDate && (
            <span className="due-date">Due: {task.dueDate.toDateString()}</span>
          )}
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
