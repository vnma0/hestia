import React, {Component} from 'react';
import {Button} from '@material-ui/core';

/**
 * @name LoginButton
 * @description A login button. ALL PROPS PASSED ARE PASSED DOWN to <Button />
 * @returns {React.Component} A @material-ui/core/Button that launches the login dialog onClick
 * @author minhducsun2002
 */

class LoginButton extends Component {
    render() {
        return (
            <Button color="inherit" {...this.props}>
            {/* inherit all props */}
                {this.props.text}
            </Button>
        )
    }
}

export default LoginButton;