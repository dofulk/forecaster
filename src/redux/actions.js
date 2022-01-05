import axios from "axios";


export const changePossibleLocations = (possibleLocations) => ({
    type: 'CHANGE_POSSIBLE_LOCATIONS',
    payload: {
        possibleLocations: possibleLocations
    }

})

const changeWeather = (weather, location) => ({
    type: 'CHANGE_WEATHER',
    payload: {
        weather: weather,
        location: location
    }

})




export const getReverseGeoLocation = (position) => {


}

export const getWeatherByLocation = (location) => {
    return dispatch => {
        axios({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/onecall?',
            params: {
                lat: location.lat,
                lon: location.lon,
                appid: `${process.env.REACT_APP_API_KEY}`,
            },
            headers: {

            }
        }).then((response) => {
            dispatch(changeWeather(response.data, location));
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const getPossibleLocations = (loc) => {
    return dispatch => {
        axios({
            method: 'GET',
            url: 'http://api.openweathermap.org/geo/1.0/direct?',
            params: {
                q: loc,
                appid: `${process.env.REACT_APP_API_KEY}`,
                limit: 5,
            },
            headers: {

            }
        }).then((response) => {
            dispatch(changePossibleLocations(response.data))
        }).catch((error) => {
            console.error(error);
        });
    }
}

export const getWeatherByCoordinates = (coords) => {
    return dispatch => {
        axios({
            method: 'GET',
            url: 'http://api.openweathermap.org/geo/1.0/reverse?',
            params: {
                lat: coords.latitude,
                lon: coords.longitude,
                appid: `${process.env.REACT_APP_API_KEY}`,
            },
            headers: {

            }
        }).then((response) => {
            dispatch(getWeatherByLocation({
                lat: coords.latitude,
                lon: coords.longitude,
                name: response.data[0].name
            }))
        }).catch((error) => {
            console.error(error);
        })
    }
}