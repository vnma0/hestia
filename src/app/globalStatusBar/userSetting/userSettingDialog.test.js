import React from 'react'
import ReactDOM from 'react-dom'
import UserSettingDialog from './userSettingDialog.js'

it('UserSettingDialog rendered - no crash', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <UserSettingDialog open={true} slideDirection={'up'} />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
