import React from 'react';


export const ForecastCard = ({ temperature, date }) => {
 

    return (
        <div>
            <div>{temperature}</div>
            <div>{date.toLocaleDateString() +"  " + date.toLocaleTimeString()}</div>
        </div>
    )
}