import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '0cf84850a69adc5885dd9dbb1499ea62'; 


  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      
      const currentWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(currentWeatherResponse.data);

      
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      setForecastData(forecastResponse.data.list.slice(0, 5)); // Get data for 5 days

    } catch (err) {
      setError('City not found.');
    } finally {
      setLoading(false);
    }
  };

  let handleChange= (e)=> {
    e.preventDefault();
    setCity(e.target.value);
  }

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      
      {loading && <div>Loading...</div>}

      
      {error && <div className="error">{error}</div>}

      
      {weatherData && !loading && !error && (
        <div id="currentWeather">
          <h2>Current Weather</h2>
          <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
        </div>
      )}

     
      {forecastData && !loading && !error && (
        <div id="forecast">
          <h2>5-Day Forecast</h2>
          <div className="forecast-cards">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast-card">
                <p><strong>Day {index + 1}</strong></p>
                <p>{day.main.temp}°C</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;