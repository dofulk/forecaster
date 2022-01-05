import React from 'react'
import { fireEvent, screen, render } from '../test-utils'
import { Toggle } from './Toggle'



test("It should call setUnit", () => {
    render(<Toggle setUnit={() => jest.fn()} unit={"celcius"}/>)
    fireEvent.click(screen.getByText("F"))
    fireEvent.click(screen.getByText("C"))
    
})