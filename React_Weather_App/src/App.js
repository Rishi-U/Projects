import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  useEffect(() => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      setLocation(storedLocation);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=973e1e04cf534f4a4afa887488a41a9d`;
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    localStorage.setItem('location', newLocation);
  };

  const convertKelvinToFahrenheit = (kelvin) => {
    const fahrenheit = (kelvin - 273.15) * 9/5 + 32;
    return parseFloat(fahrenheit.toFixed(1));
  };

  const searchLocation = async (e) => {
    if (e.key === 'Enter' && location.trim() !== '') {
      const ApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=973e1e04cf534f4a4afa887488a41a9d`;
  
      try {
        const response = await axios.get(ApiURL);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  

  return (
    <div className="app">
      <div className="container">
        <form className='search' onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
            onKeyPress={searchLocation}
          />
        </form>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{convertKelvinToFahrenheit(data.main.temp)} {'\u00b0'}F</h1> : null}
          </div>
          <div className="description">
            {data.weather?.[0]?.description !== 'nah' ? (
              <p>{data.weather?.[0]?.description}</p>
            ) : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">{convertKelvinToFahrenheit(data.main.feels_like)} {'\u00b0'}F</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? (
              <p className="bold">{data.main.humidity} %</p>
            ) : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="bold">{data.wind.speed} MPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;