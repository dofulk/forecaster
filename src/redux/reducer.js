
export const initialState = {
    location: {
        lat: 51.5072,
        lon: -0.1276,
        name: "London"
    },
    possibleLocations: [

    ],
    currentWeather: undefined,
    forecast: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_WEATHER':
            return {
                ...state,
                currentWeather: action.payload.weather.current,
                forecast: action.payload.weather.daily,
                location: action.payload.location


            }
        case 'CHANGE_POSSIBLE_LOCATIONS':
            return {
                ...state,
                possibleLocations: action.payload.possibleLocations
            }
        default:
            return state
    }
}