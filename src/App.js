import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp';
// import WeatherComponent from './components/WeatherComponent';
// import './App.css';

function App() {
  // const [dueDate, setDueDate] = useState(new Date());
  // const [location, setLocation] = useState('');

  // const handleDateChange = (date) => {
  //   setDueDate(date);
  // };

  return (
    <Router>
        {/* <WeatherComponent /> */}
      <div className="app">
        <Routes>
          {/* <Route path="/" element={<WeatherComponent />} /> */}
          <Route path="/" element={<TodoApp />} />
        </Routes>
        {/* <TodoApp /> */}
      </div>
    </Router>
  );
}

export default App;
