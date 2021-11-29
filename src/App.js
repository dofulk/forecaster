import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ForecastCard } from './forecastCard/ForecastCard'
import { FocusedWeather } from './focusedWeather/FocusedWeather';

const options = (location, type) => {
  return {
    method: 'GET',
    url: type === 'current'? 'http://api.openweathermap.org/data/2.5/weather?' : 'http://api.openweathermap.org/data/2.5/forecast?',
    params: {
      q: location,
      appid: 'cfeb84b58ddcc4c33761c0d5d58842f9'
    },
    headers: {

    }
  }
};


const convertToFarenheit = (kelvin) => {
  return Math.round(((9 / 5) * (kelvin - 273)) + 32)
}

const convertToCelcius = (kelvin) => {
  return Math.round(kelvin - 273.15)
}



function App() {

  const [forecast, setForecast] = useState()
  const [currentWeather, setCurrentWeather] = useState()
  const [location, setLocation] = useState("Minneapolis,us")
  const [inputLoc, setInputLoc] = useState('')


  // const [offsetLeft, setOffsetLeft] = useState(500)


  // const forecastListStyle= {
  //   transform: 'translateX('+ offsetLeft + 'px)'
  // }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setLocation(inputLoc)
    }
  }

  useEffect(() => {
    axios(options(location, 'fiveDay')).then((response) => {
      console.log(response.data)
      setForecast(response.data);
    }).catch((error) => {
      console.error(error);
    });

    axios(options(location, 'current')).then((response) => {
      console.log(response.data)
      setCurrentWeather(response.data)
    }).catch((error) => {
      console.error(error);
    });
  }, [location])

  const listOfForecasts = []

  const renderedForecasts = () => {
    if (forecast) {
      forecast.list.map(cast => {
        return listOfForecasts.push(<li key={cast.dt}>
          <ForecastCard cast={cast} temperature={convertToFarenheit(cast.main.temp)} date={new Date(Date.parse(cast.dt_txt))} /></li>)
      })
    }
    return listOfForecasts
  }


  return (
    <div className="App">

      <div className="input_container">

        <input type="text" id="loc" value={inputLoc} onChange={e => setInputLoc(e.target.value)} onKeyDown={handleKeyDown} placeholder="Set a Location"></input>
        <button onClick={() => setLocation(inputLoc)}>Submit</button>
      </div>
      <div className="current">
        <FocusedWeather weather={currentWeather}/>
      </div>
      <ul className="forecast_list" >{renderedForecasts()}</ul>
    </div>
  );
}

export default App;
