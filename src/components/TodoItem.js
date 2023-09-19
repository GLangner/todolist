import React, { useState } from 'react';
import './TodoItem.css';
import "./CheckBoxAnim.scss"

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
  <div className='another-box'>
    <ul className={`todo-item ${task.completed ? 'completed' : ''} 
      d-flex justify-content-between list-group list-group-horizontal rounded-0 bg-transparent`}>
      <li
        className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
          <div className="form-check" id="checklist">
            <input
              className="form-check-input me-0 "
              type="checkbox"
              id="flexCheckChecked1"
              checked={task.completed}
              onChange={() => onToggleCompletion(task.id)}
            />
            <label className={`task.completed ? 'completed' : '' fs-4`}>{task.text}</label>
          </div>
      </li>
      {isEditing ? (
        <li className="list-group-item flex-grow-1 rounded bg-transparent todo-edit-container">
        <div className='container'>
        <div className='row'>
        <div className='col-md-8'>
        <form>
          <div className='mb-3 custom-ground-color'>
            <input
              type="text"
              className='form-control custom-input-color'
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </div>
          <div className='mb-3 custom-ground-color'>
            <input
              className='form-control custom-input-color'
              type="text"
              placeholder='Category'
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            />
          </div>
          <div className='mb-3 custom-ground-color'>
            <input
              className='form-control custom-input-color'
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
          </div>
          <div className='mb-3 custom-ground-color'>
            <select
              className='form-select custom-input-color'
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="">No Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className='mb-3 custom-ground-color'>
            <textarea
              className='form-control custom-input-color'
              placeholder="Add notes"
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
            />
          </div>
          {/* Input for adding attachments */}
          <div className="mb-3 custom-ground-color">
            <input
              type="file"
              className='form-control custom-input-color'
              onChange={(e) => handleAttachmentUpload(e.target.files)}
            />
          </div>
          {task.attachments && (
          <div className="mb-3 custom-ground-color">
            Attachments:
            {task.attachments.map((attachment, index) => (
              <a
                key={index}
                className="mb-2 custom-ground-color"
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {attachment.name}
              </a>
            ))}
            {editedAttachments.map((attachment, index) => (
              <div key={index} className="mb-2 custom-input-color">
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
          <button 
            type='button'
            className="btn btn-secondary me-2 custom-button-color"
            onClick={handleRemoveAttachment}>Remove Attachment
          </button>
          <button 
            type="button"
            className="btn btn-secondary me-2 custom-button-color"
            onClick={cancelEdit}>Cancel
          </button>
          <button 
            type='button'
            className='btn btn-secondary me-2 custom-button-color'
            onClick={handleSaveClick}>Save
          </button>
          </form>
        </div>
        </div>
        </div>
        </li>
      ) : (
        <>
          {/* <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
            <div className="task-info lead fw-normal mb-0">
              <span className={task.completed ? 'completed' : ''}>{task.text}</span>
            </div>
            </li> */}
              
            <ul>
              <div className="d-flex flex-row justify-content-end mb-1">
                <span
                  className='text-info'
                  data-mdb-toggle="tooltip"
                  title='Edit task'
                  onClick={handleEditClick}>
                  <i className="fas fa-pencil-alt me-3">
                  </i>
                </span>
                <span
                  className='text-danger'
                  data-mdb-toggle="tooltip"
                  title='Delete task'
                  onClick={() => onDeleteTask(task.id)}>
                  <i className="fas fa-trash-alt">
                  </i>
                </span>
              </div>  
              <div className='text-end text-muted'>
                {task.priority && (
                  <span 
                    className="text-muted custom-ground-color"
                    data-mdb-toggle="tooltip"
                    title='Priority'>
                    <p className='small mb-0'>
                    <i className="fas fa-info-circle me-2"></i>
                      Priority: {task.priority}
                    </p>
                  </span>
                )}
                {task.category && (
                    <span 
                      className="text-muted"
                      data-mdb-toggle="tooltip"
                      title='Category'>
                      <p className='small mb-0'>
                      <i className="fas fa-info-circle me-2"></i>
                        Category: {task.category}
                      </p>
                    </span>
                  )}
                {task.dueDate && (
                  <span 
                    className="text-muted"
                    data-mdb-toggle="tooltip" 
                    title="Due Date">
                    <p className='small mb-0'>
                    <i className="fas fa-hourglass-half me-2 text-warning"></i>
                      Due: {task.dueDate.toDateString()}
                    </p>                    
                  </span>
                )}
              </div>
            </ul>
        </>
      )}
      
    </ul>
    <ul className={`todo-item ${task.completed ? 'completed' : ''} 
      list-group list-group-vertically rounded-0 bg-transparent`}>
          <div className="d-flex flex-row align-items-center ">
            <input
              className='form-control form-control-lg custom-input-color'
              id="exampleFormControlInput1"
              placeholder="Add subtask..."
              type="text"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
            />
            <button 
              onClick={handleAddSubtask}
              type="button" 
              className="btn btn-primary custom-button-color">
              <span className="bi bi-plus-circle"></span>
              </button>
            </div>
            {/* display subtasks */}
              {task.subTasks.map((subtask) => (
              <ul className={`todo-item ${subtask.completed ? 'completed' : ''}
              list-group list-group-vertically rounded-0 bg-transparent`}>  
                <li
                  key={subtask.id}
                  className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent"
                >
                <div className='form-check-subTask' id="subtasksChecklist" >
                  <input
                    className="form-check-input me-0"
                    type="checkbox"
                    id="flexCheckChecked1"
                    checked={subtask.completed}
                    onChange={() => handleToggleSubtaskCompletion(subtask.id)}
                  />
                    <label className="fs-6">{subtask.text}</label>
                </div>
                <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  <div className="task-info lead fw-normal mb-0">
                    {/* <span className="fs-6">{subtask.text}</span> */}
                  </div>
                </li>
                
                  {/* Include subtask delete button */}
                  <span 
                    className='text-danger'
                    data-mdb-toggle="tooltip"
                    title='Delete Subtask'
                    onClick={() => handleDeleteSubtask(subtask.id)}>
                    <i className="fas fa-trash-alt">
                    </i>
                  </span>
                </li>
              </ul>
        ))}
      </ul>
  </div>
  );
}

export default TodoItem;
