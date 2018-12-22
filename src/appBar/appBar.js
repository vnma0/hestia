import React, { Component } from 'react';
import { Toolbar, AppBar, IconButton } from '@material-ui/core';

import Menu from '@material-ui/icons/Menu';
import ContestSignature from './contestSignature/contestSignature.js';
import CountdownClock from './clock/clock.js';
import LoginButton from './login/loginButton.js';
import LoginDialog from './login/loginDialog.js';

/**
 * @name GlobalStatusBar
 * @description Global sticky status bar at the top of the screen
 * @param {String} contestTimeLeft time left for current contest
 * @param {String} contestDuration duration of current contest
 * @param {boolean} loggedIn true if user has logged in, otherwise false
 * @author minhducsun2002
 */

class GlobalStatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDialogOpen : false
        }
    }

    renderClock() {
        if (this.props.loggedIn)
        // if logged in, show the clock, otherwise hide it
            return (<CountdownClock
                timeLeft={this.props.contestTimeLeft} 
                duration={this.props.contestDuration} />)
        else return (<></>)
    }

    render() {
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.props.menuOpen} style={{
                            marginLeft : -12,
                            marginRight : 12
                        }}><Menu /></IconButton>
                        {/* this button opens the sidenav or invoke whatever passed as menuOpen */}

                        <ContestSignature contestName={this.props.contestName} />
                        {this.renderClock()}

                        {!this.props.loggedIn ?
                            <LoginButton text="Log in here" onClick={() => this.setState({
                                loginDialogOpen : true
                            })} /> : 
                            <></>
                            }
                    </Toolbar>
                </AppBar>
                <LoginDialog
                    open={this.state.loginDialogOpen}
                    closeer={() => this.setState({
                        loginDialogOpen : false
                    })} onClose={() => this.setState({
                        loginDialogOpen : false
                    })} />
            </>
        )
    }
}

export default GlobalStatusBar;