import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '3d21b5442051433bb77194212240706';

  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather();
    }
  };

  const getBackgroundImage = (condition) => {
    switch (condition) {
      case 'Sunny':
      case 'Clear':
        return '../images/sunny.jpg';
      case 'Partly cloudy':
      case 'Cloudy':
        return '../images/cloudy.jpg';
      case 'Overcast':
        return '../images/overcast.jpg';
      case 'Mist':
      case 'Fog':
        return '../images/fog.jpg';
      case 'Patchy rain possible':
      case 'Patchy snow possible':
      case 'Patchy sleet possible':
      case 'Patchy freezing drizzle possible':
      case 'Thundery outbreaks possible':
        return '../images/patchy_rain.jpg';
      case 'Blowing snow':
      case 'Blizzard':
      case 'Freezing fog':
        return '../images/snow.jpg';
      case 'Patchy light drizzle':
      case 'Light drizzle':
      case 'Freezing drizzle':
      case 'Heavy freezing drizzle':
      case 'Patchy light rain':
      case 'Light rain':
      case 'Moderate rain at times':
      case 'Moderate rain':
      case 'Heavy rain at times':
      case 'Heavy rain':
      case 'Light freezing rain':
      case 'Moderate or heavy freezing rain':
      case 'Light sleet':
      case 'Moderate or heavy sleet':
      case 'Patchy light snow':
      case 'Light snow':
      case 'Moderate snow':
      case 'Patchy moderate snow':
      case 'Patchy heavy snow':
      case 'Heavy snow':
        return '../images/rain.jpg';
      case 'Moderate or heavy snow showers':
      case 'Light showers of ice pellets':
      case 'Moderate or heavy showers of ice pellets':
      case 'Patchy light rain with thunder':
      case 'Moderate or heavy rain with thunder':
      case 'Patchy light snow with thunder':
      case 'Moderate or heavy snow with thunder':
        return '../images/thunderstorm.jpg';
      default:
        return '../images/default.jpg';
    }
  };

  useEffect(() => {
    if (weather) {
      document.body.style.backgroundImage = `url(${getBackgroundImage(weather.current.condition.text)})`;
    }
  }, [weather]);

  return (
    <div className="backPanel">

      <div className="app">
        <h1>Weather App</h1>
        <div className="search">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <div className="error">{error}</div>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.location.name}</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Weather: {weather.current.condition.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
