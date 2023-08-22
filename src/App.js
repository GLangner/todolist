// import { useState } from 'react';
import TodoApp from './components/TodoApp';
// import WeatherComponent from './components/WeatherComponent';
// import CalendarComponent from './components/Calendar'; // Make sure to import CalendarComponent
import './App.css';

function App() {
  // const [dueDate, setDueDate] = useState(new Date());
  // const [location, setLocation] = useState('');

  // const handleDateChange = (date) => {
  //   setDueDate(date);
  // };

  return (
    <div className="app">
      <TodoApp />
      {/* <WeatherComponent setLocation={setLocation} />
      <CalendarComponent
        selectedDate={dueDate}
        onDateChange={handleDateChange}
        location={location}
      /> */}
    </div>
  );
}

export default App;
