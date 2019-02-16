import React from 'react'
import ReactDOM from 'react-dom'
import LoginDialog from './loginDialog.js'

it('LoginDialog rendered - no crash', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LoginDialog open={true} slideDirection={'up'} />, div)
    ReactDOM.unmountComponentAtNode(div)
})
