import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react'
import App from './App'


jest.mock('axios')
import axios from 'axios'

axios.get.mockImplementation(async url => {
    if (url === 'https://api.openweathermap.org/data/2.5/onecall?') {
        Promise.resolve({
            current: {
                temp: 273.15
            },
            forecast: 'cold'
        })
    }
})


test('it should return ', () => {

    render(<App />)

    // expect(axios.get).toHaveBeenCalled()
})