import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import './Calendar.css';

//  0482db93d6884dbaa23223934231408

function CalendarComponent({ selectedDate, onDateChange, location }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data for the selected date when it changes
    console.log('useEffect triggered with selectedDate:', selectedDate, 'and location:', location);

    if (selectedDate && location) {
      console.log('Fetching weather data for:', selectedDate, location);
      fetchWeatherData(selectedDate, location);
    }
  }, [selectedDate, location]);

  const fetchWeatherData = async (date, location) => {
    const apiKey = '0482db93d6884dbaa23223934231408';
    const apiUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${date.toISOString().slice(0, 10)}`;

    console.log('API URL:', apiUrl);

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      console.log('API Response: Calendar', data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="calendar-container">
      <h2>Set Due Date:</h2>
      <Calendar onChange={onDateChange} value={selectedDate} />

      {/* Display weather information if available */}
      {weatherData && (
        <div className="weather-info">
          <h3>Weather on {selectedDate.toLocaleDateString()}</h3>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Conditions: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
