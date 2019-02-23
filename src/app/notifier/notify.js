import React from 'react'
import { Snackbar } from '@material-ui/core'

/**
 * @name Notify
 * @desc Notification component. All props will be passed down to `<Snackbar />`
 * @returns {React.Component}
 */

class Notify extends React.Component {
    render() {
        return <Snackbar {...this.props} />
    }
}

export default Notify
