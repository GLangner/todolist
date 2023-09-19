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
    <div className="weather-component custom-input-color">
      <div className="current-location-weather current-input-weather">
        {weatherData ? (
          <div className="weather-details custom-ground-color">
            <h4 className="font-weight-bold custom-input-color">{weatherData.location.name}, {weatherData.location.country}</h4>
              <div className="weather-item custom-input-color">
                <span className="font-weight-bold fasd current-input-weather">Date and Time: {weatherData.location.localtime}</span>
              </div>
              <div className="weather-item current-input-weather custom-input-color">
                <span className="font-weight-bold ">Temperature: {weatherData.current.temp_c}°C</span>
              </div>
              <div className="weather-item custom-input-color">
                <span className="font-weight-bold">Conditions: {weatherData.current.condition.text}</span>
              </div>
              <div className="weather-icon-container custom-input-color">
                <img src={weatherData.current.condition.icon}alt="Weather Icon"/>
              </div>
          {/* <div className="weather-info">
            <h3>{weatherData.location.name}, {weatherData.location.country}</h3>
            <p>Date and Time: {weatherData.location.localtime}</p>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Conditions: {weatherData.current.condition.text}</p>
            <img src={weatherData.current.condition.icon}alt="Weather Icon"/>
          </div> */}
          </div>
        ) : (
          <div className="weather-info custom-ground-color">
            <h3>Current Weather</h3>
            <input
              type="text"
              className='form-control form-control-lg custom-input-color'
              placeholder="Location..."
              value={typedLocation}
              onChange={handleTypedLocationChange}
            />
            {typedLocation && (
              <button className='weatherButton custom-button-color' onClick={() => fetchWeatherData(typedLocation)}>Get Weather</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherComponent;
