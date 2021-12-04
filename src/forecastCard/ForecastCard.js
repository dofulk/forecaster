import React from 'react';
import './ForecastCard.css'

export const ForecastCard = ({ cast, getTemperature }) => {

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date(cast.dt * 1000)
    let today = new Date()
    let getDay = () => {
        if (today.getDay() === date.getDay() && today.getDate() === date.getDate()) {
  
            return "today"
        } else if (today.getDay() + 1 === date.getDay() || (today.getDay()=== 6  && date.getDay() === 0)) {
            return "Tommorow"
        } else {
            return days[date.getDay()]
        }
    }


const convertToFarenheit = (kelvin) => {
    return Math.round(((9 / 5) * (kelvin - 273)) + 32)
  }



    return (
        <div className="forecastcard">
            <div className="forecastcard_temp">{getTemperature(cast.temp.max)}°/{getTemperature(cast.temp.min)}°</div>
            <div className="forecastcard_day">{getDay()}</div>
            <img className="forecastcard_icon" src={'http://openweathermap.org/img/wn/'+ cast.weather[0].icon +'.png'} alt="_"></img>
        </div>
    )
}