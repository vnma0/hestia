import React, { Component } from 'react'
import { Button } from '@material-ui/core'

/**
 * @name LoginButton
 * @description A login button.
 * @returns {React.Component} A 'Button' that launches the login dialog onClick
 * @author minhducsun2002
 */

class LoginButton extends Component {
    render() {
        return (
            <Button color="inherit" {...this.props}>
                {this.props.children}
            </Button>
        )
    }
}

export default LoginButton
