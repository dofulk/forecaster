import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import './Input.css'
import { Lens } from '../Icons/Lens';
import { useDispatch, useSelector } from 'react-redux';
import { possibleLocationsSelector } from '../redux/selectors';
import { changePossibleLocations, getPossibleLocations, getWeatherByLocation } from '../redux/actions';


export const Input = () => {


    const [isFocused, setIsFocused] = useState(false)
    const [inputLoc, setInputLoc] = useState("")
    const possibleLocations = useSelector(possibleLocationsSelector)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(changePossibleLocations([]))
        let timer = setTimeout(() => {
            if (inputLoc.length >= 3) {

                dispatch(getPossibleLocations(inputLoc))


            }
        }, 300);
        return () => clearTimeout(timer)
    }, [inputLoc])



    const handleClick = (item) => {
        dispatch(getWeatherByLocation({
            lat: item.lat,
            lon: item.lon,
            name: item.name
        }))
        setInputLoc('')
    }

    return (
        <div className="search"


        >
            <Lens className="search_symbol" ></Lens>
            <input className="search_input"
                type="text"
                placeholder="Change Location"
                value={inputLoc || ''}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setInputLoc(e.target.value)}
            />



            {(isFocused && possibleLocations && possibleLocations.length) ? <div className="search_suggestion">
                {
                    possibleLocations.map((item) => (
                        <div key={item.lat} className="search_suggestion_item" onMouseDown={(e) => e.preventDefault()} onClick={() => handleClick(item)}>
                            <Lens className="search_suggestion_item_symbol" ></Lens>
                            {item.name}, {item.country === "US" ? item.state : item.country}
                        </div>
                    ))
                }
            </div> : <div />}
        </div>
    );
};

