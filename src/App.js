import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp';
// import WeatherComponent from './components/WeatherComponent';
import './App.css';

function App() {
  // const [dueDate, setDueDate] = useState(new Date());
  // const [location, setLocation] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // const handleDateChange = (date) => {
  //   setDueDate(date);
  // };

  return (
    <Router>
        {/* <WeatherComponent /> */}
      <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className='toggle-mode'>
        <label className='check-label'>
            <input
              className='check-input'
              type="checkbox"
              defaultChecked={!isDarkMode}
              onClick={toggleDarkMode}
            />
            <span className='check-span'/>
          </label>
            <h6>
              Toggle Dark Mode
            </h6>
          </div>
        <Routes>
          {/* <Route path="/" element={<WeatherComponent />} /> */}
          <Route path="/" element={<TodoApp />} />
        </Routes>
        {/* <TodoApp /> */}
        <div>
          .
        </div>
      </div>
    </Router>
  );
}

export default App;
