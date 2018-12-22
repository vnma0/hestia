import React, { Component } from 'react';
import { Toolbar, AppBar, IconButton } from '@material-ui/core';

import Menu from '@material-ui/icons/Menu';
import ContestSignature from './contestSignature/contestSignature.js';
import CountdownClock from './clock/clock.js';
import LoginButton from './login/loginButton.js';
import LoginDialog from './login/loginDialog.js';
import UserSettingButton from './userSetting/userSettingButton.js';
import UserSettingMenu from './userSetting/userSettingMenu.js';

/**
 * @name GlobalStatusBar
 * @description Global sticky status bar at the top of the screen
 * @param {String} contestTimeLeft time left for current contest
 * @param {String} contestDuration duration of current contest
 * @param {String} currentUser currently logged in user
 * @param {boolean} loggedIn true if user has logged in, otherwise false
 * @author minhducsun2002
 */

class GlobalStatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDialogOpen : false,
            userMenuOpen : false,
            userMenuAnchorElement : undefined
        }
        
        this.closeLoginDialog = this.closeLoginDialog.bind(this);
        this.openUserMenu = this.openUserMenu.bind(this);
    }

    renderClock() {
        if (this.props.loggedIn)
        // if logged in, show the clock, otherwise hide it
            return (<CountdownClock
                timeLeft={this.props.contestTimeLeft} 
                duration={this.props.contestDuration} />)
        else return (<></>)
    }

    renderLoginDialog() {
        return (
            <LoginDialog
                open={this.state.loginDialogOpen}
                closeer={this.closeLoginDialog} onClose={this.closeLoginDialog} />
        )
    }

    closeLoginDialog() {
        this.setState({
            loginDialogOpen : false
        })
    }

    openUserMenu(event) {
        this.setState({
            userMenuAnchorElement : event.currentTarget,
            userMenuOpen : true
        })
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
                            <UserSettingButton 
                                user={this.props.currentUser} onClick={this.openUserMenu}/>}
                    </Toolbar>
                </AppBar>

                {this.renderLoginDialog()}

                <UserSettingMenu anchorEl={this.state.userMenuAnchorElement}
                user={this.props.currentUser} open={this.state.userMenuOpen}
                onClose={() => this.setState({
                    userMenuOpen : false
                })}/>
            </>
        )
    }
}

export default GlobalStatusBar;