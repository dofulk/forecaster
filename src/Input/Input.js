import React from 'react';
import { useState } from 'react/cjs/react.development';
import './Input.css'
import { Lens } from '../Icons/Lens';


export const Input = ({ value, onChange, possibleLocations, setLocation, setInputLoc }) => {


    const [isFocused, setIsFoucuesd] = useState(false)


    const handleClick = (item) => {
        setLocation({
            lat: item.lat,
            lon: item.lon,
            name: item.name
        })
        setInputLoc('')
    }



    return (
        <div className="search">
            <Lens className="search_symbol" ></Lens>
            <input className="search_input"
                type="text"
                placeholder="Change Location"
                value={value}
                onChange={(e) => onChange(e)}
                onFocus={() => setIsFoucuesd(true)}
                onBlur={() => setIsFoucuesd(false)}
            />


            
           { (isFocused && possibleLocations.length) ? <div className="search_suggestion">
                {
                    possibleLocations.map((item) => (
                        <div key={item.lat} className="search_suggestion_item" onMouseDown={(e)=> e.preventDefault()} onClick={() => handleClick(item)} >
                             <Lens className="search_suggestion_item_symbol" ></Lens>
                            {item.name}, {item.country === "US" ? item.state : item.country}
                        </div>
                    ))
}
            </div> : <div/>}
        </div>
    );
};

