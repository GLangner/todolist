import React, { useState, useEffect } from 'react';
import './TodoApp.css';
import './customStyles.css';
import CalendarComponent from './Calendar';
import TodoList from './TodoList';
import WeatherComponent from './WeatherComponent'; // Import WeatherComponent


function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(''); // Add selectedPriority state
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setFilteredTasks(tasks.filter((task) =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [tasks, searchQuery]);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        category: selectedCategory,
        priority: selectedPriority, // Store the selected priority
        completed: false,
        dueDate: selectedDate instanceof Date ? selectedDate : null,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setSelectedDate(new Date());
      setSelectedPriority(''); // Reset selectedPriority
      setCalendarVisible(false);
    }
  };

  const toggleCalendarVisibility = () => {
    setCalendarVisible(!calendarVisible);
  };

  const handleToggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleAddCustomCategory = () => {
    if (customCategoryInput.trim() !== '') {
      setSelectedCategory(customCategoryInput);
      setCustomCategoryInput('');
    }
  };

  const handleSearch = (query) => {
      setSearchQuery(query);
      setFilteredTasks(tasks.filter((task) =>
        task.text.toLowerCase().includes(query.toLowerCase())
      ));
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className='task-input'
      />
      <button onClick={handleAddTask} className='add-button'>Add Task</button>
      <button onClick={toggleCalendarVisibility} className='date-button'>
        {calendarVisible ? 'Hide Calendar' : 'Set Date'}
      </button>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className='category-select'
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Wishlist">Wishlist</option>
        <option value="Birthday">Birthday</option>
        <option value="custom">Custom Category</option>
      </select>
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
      >
        <option value="">No Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {selectedCategory === 'custom' && (
        <div className='custom-category-container'>
          <input
            type='text'
            placeholder='Enter custom category'
            value={customCategoryInput}
            onChange={(e) => setCustomCategoryInput(e.target.value)}
          />
          <button onClick={handleAddCustomCategory}>Add</button>
        </div>
      )}

      {calendarVisible && (
        <CalendarComponent selectedDate={selectedDate} onDateChange={setSelectedDate} />
      )}

      <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <TodoList
          tasks={searchQuery ? filteredTasks : tasks}
          onToggleCompletion={handleToggleCompletion}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
        {/* Add the WeatherComponent */}
        <WeatherComponent />
    </div>
  );
}

export default TodoApp;
