import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle'

/**
 * @name UserSettingButton
 * @description A button triggering some user options
 * @param {String} user Username to display
 * @return {React.Component} A '@material-ui/core/Button' component with AccountCircle icon
 */

class UserSettingButton extends Component {
    render() {
        return (
                <>
                    <Button style={{
                        backgroundColor : '#33eb91',
                        marginLeft: 10
                    }} {...this.props}>
                        {this.props.user}
                        <AccountCircle style={{marginLeft : 5}}/>
                    </Button>
                </>
        )
    }
}

export default UserSettingButton;