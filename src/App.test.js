import React from 'react';
import { fireEvent, screen, render, waitFor } from './test-utils'
import App from './App'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
    rest.get('http://api.openweathermap.org/geo/1.0/direct', (req, res, ctx) => {
        return res(ctx.json([
            {

                lat: 90,
                lon: 90,
                name: 'Atlantis',
                country: 'US',
                state: 'MN'
            }
        ]))
    }),

    rest.get('https://api.openweathermap.org/data/2.5/onecall', (req, res, ctx) => {
        return res(ctx.json({
            current: {
                temp: 288.15,
                weather: ['2b']
            },
            daily: [
                { temp: {
                    max: 303.15,
                    min: 288.15,
                    

                },
                weather: ['2b'],
                dt: Date.now() / 1000
            }
            ],

        }))
    }),
    rest.get('http://api.openweathermap.org/geo/1.0/reverse', (req, res, ctx) => {
        return res(ctx.json([{
            name: 'Paris',

        }]))
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('APP Tests', () => {
    it('should render', () => {
        render(<App />)
    })

    it('should render the current weather', async () => {
        render(<App />)

        await waitFor(() => expect(screen.getByText('59°')).toBeInTheDocument())
    })
    it('should render temp in Celcius when button is toggled to C', async () => {
        render(<App />)
        const celciusToggle = screen.getByText("C")
        fireEvent.click(celciusToggle)
        await waitFor(() => expect(screen.getByText('15°')).toBeInTheDocument())
    })
    it('should render temp in Fahrenheit when button is toggled to F', async () => {
        render(<App />)
        const celciusToggle = screen.getByText("C")
        fireEvent.click(celciusToggle)
        const fahrenheitToggle = screen.getByText("F")
        fireEvent.click(fahrenheitToggle)
        await waitFor(() => expect(screen.getByText('59°')).toBeInTheDocument())
    })
    it('renders the weather forecast', async () => {
        render(<App/>)
        await waitFor(() => expect(screen.getByText('Today')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText('86°/59°')).toBeInTheDocument())
    })

    it('should use geolocation to return the location', async () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementationOnce((success) => Promise.resolve(success({
                    coords: {
                        latitude: 51.1,
                        longitude: 45.3
                    }
                })))
        };
        global.navigator.geolocation = mockGeolocation;
        render(<App />)

        await waitFor(() => expect(screen.getByText('In Paris It Is')).toBeInTheDocument())
    })
})