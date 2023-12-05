import React, { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState({})
  const [location, setLocation] = useState({})

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=418c434397833c458b76769ae5d603c6`;
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=418c434397833c458b76769ae5d603c6`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(geoUrl).then((response) => {
        setLocation({
          lat: response.data[0].lat,
          lon: response.data[0].lon
        });
        console.log(response.data);
        console.log(location);
      })
      console.log(location);
      // if (geoData) {
      //   axios.get(weatherUrl).then((response) => {
      //     setData(response.data)
      //     console.log(response.data)
      //   })
      // }
      setCity('')
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input
          value={city}
          onChange={event => setCity(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
