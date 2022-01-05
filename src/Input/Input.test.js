import React from 'react';
import { fireEvent, screen, render, waitFor } from '../test-utils'
import { Input } from './Input';
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
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Input Tests', () => {
    it('should render', () => {
        render(<Input />)
    })

    it("should render input value", () => {
        render(<Input />)
        const input = screen.getByPlaceholderText("Change Location")
        fireEvent.focus(input)
        fireEvent.click(input)
        fireEvent.change(input, { target: { value: 'Atlantis' } })
        expect(input.value).toBe('Atlantis')
    })
    it("should render search suggestions when isFocused", async () => {

        render(<Input />)
        const input = screen.getByPlaceholderText("Change Location")
        fireEvent.focus(input)
        fireEvent.click(input)
        fireEvent.change(input, { target: { value: 'Atlantis' } })

        await waitFor(() => expect(screen.getByText("Atlantis, MN")).toBeInTheDocument())
        fireEvent.blur(input)
        expect(screen.queryByText("Atlantis, MN")).not.toBeInTheDocument()

    })

})
