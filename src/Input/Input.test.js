import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react'
import { Input } from './Input';



const props = {
    onChange: jest.fn(),
    possibleLocations: [{
        lat: 90,
        name: 'Atlantis',
        country: 'US',
        state: 'MN'
    }]
}
const setup = () => {
    const utils = render(<Input {...props} />)
    const input = utils.getByPlaceholderText("Change Location")
    return {
        input,
        ...utils,
    }

}

test("It should call OnChange", () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'Portland' } })
    expect(props.onChange).toHaveBeenCalledTimes(1)
})

test("It should render search suggestion when isFocused & Possible Locations", () => {
    render(<Input {...props} />)
    const input = screen.getByPlaceholderText("Change Location")
    fireEvent.focus(input)
    fireEvent.click(input)


    expect(screen.getByText("Atlantis, MN")).toBeInTheDocument()
    fireEvent.blur(input)
    expect(screen.queryByText("Atlantis, MN")).not.toBeInTheDocument()

})

