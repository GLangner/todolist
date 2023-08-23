import React, { useState } from 'react';
// import './TodoItem.css';

function TodoItem({ task, onToggleCompletion, onDeleteTask, onUpdateTask }) {
  // console.log('Received task in TodoItem:', task);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
  );
  const [editedCategory, setEditedCategory] = useState(task.category); // New state for edited category
  const [editedPriority, setEditedPriority] = useState(task.priority); // New state for edited priority
  
  const [subtaskInput, setSubtaskInput] = useState('');
  const [editedNotes, setEditedNotes] = useState(task.notes);
  const [editedAttachments, setEditedAttachments] = useState([]);
  
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedNotes(task.notes); // Initialize edited notes
    setEditedAttachments(task.attachments); // Initialize edited attachments
};

  const handleSaveClick = () => {
    const updatedTask = {
      ...task,
      text: editedText,
      category: editedCategory,
      priority: editedPriority, // Include priority
      dueDate: editedDueDate ? new Date(`${editedDueDate}T00:00:00`) : null,
      notes: editedNotes,
      attachments: editedAttachments,
    };
    onUpdateTask(updatedTask);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    // Reset state variables to their original values
    setIsEditing(false);
    setEditedText(task.text);
    setEditedDueDate(task.dueDate ? task.dueDate.toISOString().split('T')[0] : '');
    setEditedCategory(task.category);
    setEditedPriority(task.priority);
  };

  const handleAddSubtask = () => {
    if (subtaskInput.trim() !== '') {
      const newSubtask = {
        id: Date.now(),
        text: subtaskInput,
        completed: false,
      };
      const updatedSubtasks = [...task.subTasks, newSubtask];
      const updatedTask = { ...task, subTasks: updatedSubtasks };
      onUpdateTask(updatedTask);
      setSubtaskInput('');
    }
  };

  const handleDeleteSubtask = (subtaskId) => {
    // Filter out the subtask with the matching id
    const updatedSubtasks = task.subTasks.filter((subtask) => subtask.id !== subtaskId);
    // Create an updated task with the modified subtasks array
    const updatedTask = { ...task, subTasks: updatedSubtasks };
    // Update the task with the modified subtasks
    onUpdateTask(updatedTask);
  };

  const handleToggleSubtaskCompletion = (subtaskId) => {
    const updatedSubtasks = task.subTasks.map((subtask) =>
      subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
    );
    const updatedTask = { ...task, subTasks: updatedSubtasks };
    onUpdateTask(updatedTask);
  };

  const handleAttachmentUpload = (fileList) => {
    const filesArray = Array.from(fileList);
    setEditedAttachments(filesArray);
  };

  const handleRemoveAttachment = (attachmentIndex) => {
    // Create a copy of the editedAttachments array
    const updatedAttachments = [...editedAttachments];
  
    // Remove the attachment at the specified index
    updatedAttachments.splice(attachmentIndex, 1);
  
    // Update the state with the new attachments
    setEditedAttachments(updatedAttachments);
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
            placeholder='Category'
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
          <textarea
            placeholder="Add notes"
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
          />
          {/* Input for adding attachments */}
          <input
            type="file"
            onChange={(e) => handleAttachmentUpload(e.target.files)}
          />
          {task.attachments && (
          <div className="task-attachments">
            Attachments:
            {task.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {attachment.name}
              </a>
            ))}
            {editedAttachments.map((attachment, index) => (
              <div key={index}>
                <img src={URL.createObjectURL(attachment)} alt={`Attachment ${index}`} />
                {/* Add a button to remove the attachment if needed */}
                {/* <button onClick={() => handleRemoveAttachment(index)}>Remove</button> */}
              </div>
            ))}
            {editedAttachments.map((attachment, index) => (
            <div key={index}>
              <a href={URL.createObjectURL(attachment)} target="_blank" rel="noopener noreferrer">
                {attachment.name} {/* Display the file name */}
              </a>
              {/* Add a button to remove the attachment if needed */}
              {/* <button onClick={() => handleRemoveAttachment(index)}>Remove</button> */}
            </div>
          ))}
          </div>
        )}
          <button onClick={handleRemoveAttachment}>Remove Attachment</button>
          <button onClick={cancelEdit}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <div className="task-info">
            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
          </div>
          {task.priority && (
            <span className="task-priority">Priority: {task.priority}</span>
          )}
          {task.category && (
              <span className="task-category">Category: {task.category}</span>
            )}
          {task.dueDate && (
            <span className="due-date">Due: {task.dueDate.toDateString()}</span>
          )}
          <div className="subtask-container">
            <input
              type="text"
              placeholder="Add subtask"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
            />
            <button onClick={handleAddSubtask}>Add Subtask</button>
          </div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </>
      )}
      <ul>
        {task.subTasks.map((subtask) => (
          <li
            key={subtask.id}
            className={`todo-item ${subtask.completed ? 'completed' : ''}`}
          >
            {/* Display subtask text */}
            <span>{subtask.text}</span>
            {/* Include subtask completion checkbox */}
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => handleToggleSubtaskCompletion(subtask.id)}
            />
            {/* Include subtask delete button */}
            <button onClick={() => handleDeleteSubtask(subtask.id)}>Delete Subtask</button>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default TodoItem;
