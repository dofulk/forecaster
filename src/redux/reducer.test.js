import { reducer, initialState } from './reducer'

test('It should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        ...initialState
    })
})

test('It should handle changing the weather forecast', () => {
    expect(reducer(initialState, {
        type: 'CHANGE_WEATHER',
        payload: {
            location: 'Canbarra',
            weather: {
                current: 'Balmy',
                daily: 'Hot'
            }
        }
    })).toEqual({
        ...initialState,
        location: 'Canbarra',
        currentWeather: 'Balmy',
        forecast: 'Hot'
    })
})

test('It should handle changing possible locations', () => {
    expect(reducer(initialState, {
        type: 'CHANGE_POSSIBLE_LOCATIONS',
        payload: {
            possibleLocations: 'Mars'
        }
    })).toEqual({
        ...initialState,
        possibleLocations: 'Mars'
    })
})