import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStatusBar from './globalStatusBar.js'

it('GlobalStatusBar rendered - no crash', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <GlobalStatusBar
            contestName="Kỳ thi 1"
            currentUser="Test User"
            contestTimeLeft="00:00:00"
            contestDuration="23:59:59"
            loggedIn={true}
        />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
