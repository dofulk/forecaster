import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ForecastCard } from './forecastCard/ForecastCard'
import { CurrentWeather } from './currentWeather/CurrentWeather';
import { Input } from './Input/Input'
import { Toggle } from './Toggle/Toggle';

const locationOptions = (loc) => {
  return {
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/onecall?',
    params: {
      lat: loc.lat,
      lon: loc.lon,
      appid: `${process.env.REACT_APP_API_KEY}`,
    },
    headers: {

    }
  }
};

const geoOptions = (loc) => {
  return {
    method: 'GET',
    url: 'http://api.openweathermap.org/geo/1.0/direct?',
    params: {
      q: loc,
      appid: `${process.env.REACT_APP_API_KEY}`,
      limit: 5,
    },
    headers: {

    }
  }
}

const reverseGeoOptions = (lat, lon) => {
  return {
    method: 'GET',
    url: 'http://api.openweathermap.org/geo/1.0/reverse?',
    params: {
      lat: lat,
      lon: lon,
      appid: `${process.env.REACT_APP_API_KEY}`,
    },
    headers: {

    }
  }
}

const convertToFarenheit = (kelvin) => {
  return Math.round(((9 / 5) * (kelvin - 273)) + 32)
}

const convertToCelcius = (kelvin) => {
  return Math.round(kelvin - 273.15)
}



function App() {

  const [weather, setWeather] = useState()

  const [forecast, setForecast] = useState()
  const [currentWeather, setCurrentWeather] = useState()
  const [location, setLocation] = useState({
    lat: 51.5072,
    lon: 0,
    name: "London"
  })
  const [possibleLocations, setPossibleLocations] = useState([])
  const [inputLoc, setInputLoc] = useState('')
  const [unit, setUnit] = useState("fahrenheit")


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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setLocation(inputLoc)
    }
  }



  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('no geo access')
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        axios(reverseGeoOptions(position.coords.latitude, position.coords.longitude)).then((response) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: response.data[0].name
          })
        }).catch((error) => {
          console.error(error);
        })
      })
    }
  }, [])


  useEffect(() => {
    if (weather) {
      setCurrentWeather(weather.current)
      setForecast(weather.daily)
    }
  }, [weather])

  useEffect(() => {
    if (location) {
      axios(locationOptions(location)).then((response) => {
        setWeather(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [location])

  useEffect(() => {
    if (inputLoc.length >= 3) {
      let timer = setTimeout(() => {
        axios(geoOptions(inputLoc)).then((response) => {
          setPossibleLocations(response.data)
          console.log(response.data)
        }).catch((error) => {
          console.error(error);
        });

      }, 300);
      return () => clearTimeout(timer)
    } else {
      setPossibleLocations([])
    }
  }, [inputLoc])

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
        <Input className="search" type="text" id="loc" value={inputLoc} onChange={e => setInputLoc(e.target.value)} onKeyDown={handleKeyDown} placeholder="Set a Location" possibleLocations={possibleLocations} setLocation={setLocation} setInputLoc={setInputLoc}></Input>
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
