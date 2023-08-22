import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import './Calendar.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

function CalendarWithWeather() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  const fetchWeatherData = async (date, city) => {
    const apiKey = '0482db93d6884dbaa23223934231408';
    const apiUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date.toISOString().slice(0, 10)}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      console.log('API Response: Calendar', data);
      setForecastData(data.forecast.forecastday[0].hour); // Extract hourly forecast data
      setLocationData(data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCityChange = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    // Fetch weather data for the selected date and location
    if (selectedDate && location) {
      console.log('Fetching weather data for:', selectedDate, location);
      fetchWeatherData(selectedDate, location);
    }
  }, [selectedDate, location]);

  const getCurrentTime = () => {
    if (locationData) {
      const localTimeString = locationData.location.localtime;
      const localTime = new Date(localTimeString);
      return localTime;
    }
    return null;
  };

  const getCurrentDate = () => {
    if (locationData) {
      const localTimeString = locationData.location.localtime;
      const localTime = new Date(localTimeString);
      return new Date(localTime.getFullYear(), localTime.getMonth(), localTime.getDate());
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h2>Set Due Date:</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />

      <h2>Weather</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={location}
        onChange={handleCityChange}
      />

      {forecastData && locationData && (
        <div className="weather-info">
          <h3>Weather on {locationData.location.name}, {locationData.location.country}</h3>
            {locationData.location.localtime && (
              <h4>Current Date: {getCurrentDate().toLocaleDateString()}, Current Time: {getCurrentTime().toLocaleTimeString()}</h4>
            )}          
          <div className="custom-date-slider-container">
            <Slider
              min={0}
              max={forecastData.length - 1}
              step={1}
              defaultValue={0}
              marks={forecastData.map((_, index) => index)}
              onChange={(value) => setSelectedDate(new Date(forecastData[value].time))}
            />
          </div>
          <div className="forecast-details">
            <p>Time: {forecastData[selectedDate.getHours()].time}</p>
            <p>Temperature: {forecastData[selectedDate.getHours()].temp_c}°C</p>
            <p>Conditions: {forecastData[selectedDate.getHours()].condition.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarWithWeather;
