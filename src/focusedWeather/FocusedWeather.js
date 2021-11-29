import React from 'react';
import './FocusedWeather.css'

export const FocusedWeather = ({ weather }) => {
    const convertToFarenheit = (kelvin) => {
        return Math.round(((9 / 5) * (kelvin - 273)) + 32)
      }
      

    return (
        <div className="forecast_card">
            <div className="city">{weather && weather.name}</div>
            <div>{weather && weather.weather[0].description + " " + convertToFarenheit(weather.main.temp) + "°F"}</div>
            
        </div>
    )
}