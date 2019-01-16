import React from 'react';
import { Snackbar } from '@material-ui/core';

import {slideIn} from '../globalStatusBar/lib/libTransition.js';

/**
 * @name Notify
 * @desc Notification component. All props will be passed down to `<Snackbar />`
 * @returns {React.Component}
 */

class Notify extends React.Component {
    render() {
        return (
            <Snackbar {...this.props}/>
        )
    }
}

export default Notify;