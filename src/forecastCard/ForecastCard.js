import React from 'react';
import './ForecastCard.css'

export const ForecastCard = ({ cast, temperature, date }) => {

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date()
    console.log(cast)
    let getDay = () => {
        if (today.getDay() === date.getDay()) {
  
            return "today"
        } else if (today.getDay() + 1 === date.getDay() || (today.getDay()=== 6  && date.getDay() === 0)) {
            return "Tommorow"
        } else {
            return days[date.getDay()]
        }
    }



    return (
        <div className="forecast_card">
            <div>{temperature}°</div>
            <div>{getDay() + "  " + date.getHours() + ':00'}</div>
            <img src={'http://openweathermap.org/img/wn/'+ cast.weather[0].icon +'.png'}></img>
        </div>
    )
}