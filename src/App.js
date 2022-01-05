import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { ForecastCard } from './forecastCard/ForecastCard'
import { CurrentWeather } from './currentWeather/CurrentWeather';
import { Input } from './Input/Input'
import { Toggle } from './Toggle/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { currentWeatherSelector, forecastSelector, locationSelecter } from './redux/selectors';
import { getWeatherByCoordinates, getWeatherByLocation } from './redux/actions';



const convertToFarenheit = (kelvin) => {
  return Math.round(((9 / 5) * (kelvin - 273)) + 32)
}

const convertToCelcius = (kelvin) => {
  return Math.round(kelvin - 273.15)
}



function App() {



  const forecast = useSelector(forecastSelector)
  const currentWeather = useSelector(currentWeatherSelector)
  const [unit, setUnit] = useState("fahrenheit")
  const location = useSelector(locationSelecter)

  const dispatch = useDispatch()



  const getTemperature = (kelvin) => {
    switch (unit) {
      case "fahrenheit":
        return convertToFarenheit(kelvin)
      case "celcius":
        return convertToCelcius(kelvin)
      default:
        return kelvin;
    }
  }


  useEffect(() => {
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
       dispatch(getWeatherByCoordinates(position.coords))
      })
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getWeatherByLocation(location))
  }, [dispatch, location])





  const listOfForecasts = []

  const renderedForecasts = () => {
    if (forecast) {
      forecast.map(cast => {
        return listOfForecasts.push(<li key={cast.dt}>
          <ForecastCard cast={cast} getTemperature={getTemperature} /></li>)
      })
    }
    return listOfForecasts
  }


  return (
    <div className="App">

      <div className="input_container">
        <Input className="search" type="text" id="loc" placeholder="Set a Location"></Input>
        <Toggle className="toggle" unit={unit} setUnit={setUnit} />
      </div>
      <div className="current">
        {currentWeather && <CurrentWeather weather={currentWeather} location={location} getTemperature={getTemperature} />}
      </div>
      <ul className="forecast_list" >{renderedForecasts()}</ul>
    </div>
  );
}

export default App;
