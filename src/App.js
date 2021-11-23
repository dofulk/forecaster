import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ForecastCard } from './forecastCard/ForecastCard'

const options = (location) => {
  return {
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/forecast?',
    params: {
      q: location,
      appid: 'cfeb84b58ddcc4c33761c0d5d58842f9'
    },
    headers: {

    }
  }
};

const convertToFarenheit = (kelvin) => {
  return (((9 / 5) * (kelvin - 273)) + 32)
}

const convertToCelcius = (kelvin) => {
  return (kelvin - 273.15)
}



function App() {

  const [forecast, setForecast] = useState()
  const [location, setLocation] = useState("Minneapolis,us")
  const [inputLoc, setInputLoc] = useState('')


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setLocation(inputLoc)
    }
  }

  useEffect(() => {
    axios(options(location)).then((response) => {
      console.log(response.data)
      setForecast(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, [location])

  const listOfForecasts = []

  const renderedForecasts = () => {
    if (forecast) {
      forecast.list.map(cast => {
        return listOfForecasts.push(<li key={cast.dt}>
          <ForecastCard temperature={Math.round(convertToFarenheit(cast.main.temp))} date={new Date(Date.parse(cast.dt_txt))} /></li>)
      })
    }
    return listOfForecasts
  }


  return (
    <div className="App">

      <input type="text" id="loc" value={inputLoc} onChange={e => setInputLoc(e.target.value)} onKeyDown={handleKeyDown} placeholder="Set a Location"></input>
      <button onClick={() => setLocation(inputLoc)}>Submit</button>
      <ul style={{ listStyle: "none" }}>{renderedForecasts()}</ul>
    </div>
  );
}

export default App;
