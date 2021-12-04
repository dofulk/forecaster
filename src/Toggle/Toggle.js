import React from "react"
import './Toggle.css'


export const Toggle = ({unit , setUnit}) => {



    return (

        <div className="toggle">
            <div className="celcius" unit={unit} onClick={() => setUnit("celcius")}>C</div>
            <div className="fahrenheit" unit={unit} onClick={() => setUnit("fahrenheit")}>F</div>
        </div>
    )
}