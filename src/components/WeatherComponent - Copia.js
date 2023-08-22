import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherComponent.css';

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const fetchWeatherData = async (city) => {
    const apiKey = '0482db93d6884dbaa23223934231408';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      console.log('API Response: Text', data);
      setWeatherData(data);
      setLocation(city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather-component">
      <h2>Weather</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.location.name}, {weatherData.location.country}</h3>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Conditions: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherComponent;
