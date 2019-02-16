import React from 'react'
import ReactDOM from 'react-dom'
import CountdownClock from './clock.js'

it('CountdownClock rendered - no crash', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <CountdownClock timeLeft="00:00:01" duration="23:59:59" />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
