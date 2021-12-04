import React from 'react';
import './CurrentWeather.css'

export const CurrentWeather = ({ weather, location, getTemperature }) => {



    return (
        <div className="currentweather">
            <div className="city">In {location.name} It Is</div>
            <div className="temp">{getTemperature(weather.temp)}°</div>
            <img className="icon"src={'http://openweathermap.org/img/wn/'+ weather.weather[0].icon +'@2x.png'} alt="_"></img>

        </div>
    )
}