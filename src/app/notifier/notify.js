import React from 'react';
import { Snackbar } from '@material-ui/core';

/**
 * @name Notify
 * @desc Notification component. All props will be passed down to `<Snackbar />`
 * @returns {React.Component}
 */

export let pushNotification = null;

class Notify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
            open: false
        };
        pushNotification = this.notify = this.notify.bind(this);
    }

    notify(message) {
        this.setState({
            message: message,
            open: true
        });
    }

    render() {
        return (
            <Snackbar
                {...this.props}
                message={this.state.message}
                open={this.state.open}
                onClose={() => this.setState({ open: false })}
            />
        );
    }
}

export default Notify;
