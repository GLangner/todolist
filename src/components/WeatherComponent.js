import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherComponent.css';

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [typedLocation, setTypedLocation] = useState('');

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      fetchWeatherDataByCoordinates(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation]);

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const fetchWeatherDataByCoordinates = async (latitude, longitude) => {
    const apiKey = '0482db93d6884dbaa23223934231408';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      console.log('API Response: Coordinates', data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

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

  useEffect(() => {
    // Fetch user's current location
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const handleTypedLocationChange = (event) => {
    setTypedLocation(event.target.value);
  };

  return (
    <div className="weather-component">
      <div className="current-location-weather">
        {weatherData ? (
          <div className="weather-info">
            <h3>{weatherData.location.name}, {weatherData.location.country}</h3>
            <p>Date and Time: {weatherData.location.localtime}</p>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Conditions: {weatherData.current.condition.text}</p>
          </div>
        ) : (
          <div className="weather-info">
            <h3>Current Weather</h3>
            <input
              type="text"
              placeholder="Type your location for weather"
              value={typedLocation}
              onChange={handleTypedLocationChange}
            />
            {typedLocation && (
              <button onClick={() => fetchWeatherData(typedLocation)}>Get Weather</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherComponent;
