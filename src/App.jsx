import React, { useState } from 'react';
import './styles.css';

const API_KEY = '8b1e7daaa6f20479706438d703cb224e'; 

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) setWeather(data);
    setCity('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <h1 id="heading">Weather App</h1>
      <div>
        <input
          id="input-box"
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id="search-btn" onClick={fetchWeather}>Search</button>
      </div>

      <div id="weather-information">
        {weather && (
          <div id="weather-place">
            <div className="upper-template">
              <div className="icon-temp">
                <img className="weather-icon" src={`images/${weather.weather[0].main.toLowerCase()}.png`} alt="icon" />
                <h1 className="temperature">{parseInt(weather.main.temp)}°C</h1>
              </div>
              <h1 className="city-name">{weather.name}</h1>
            </div>

            <div className="details">
              <div className="column-1">
                <img className="humidity-icon" src="images/humidity.png" alt="Humidity" />
                <div>
                  <p className="humidity">{weather.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="column-2">
                <img className="wind-icon" src="images/wind.png" alt="Wind Speed" />
                <div>
                  <p className="wind-speed">{weather.wind.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
