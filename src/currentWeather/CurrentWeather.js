import React from 'react';
import './CurrentWeather.css'

export const CurrentWeather = ({ weather, location, getTemperature, unit }) => {




    return (
        <div className="currentweather">
            <div className="city">In {location.name}, {location.state ? location.state : location.country} It Is</div>
            <div className="temp"><img src={'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'} alt="_" ></img> <div> {getTemperature(weather.temp)}° {unit === 'celcius' ? "C" : "F"}</div></div>


        </div>
    )
}