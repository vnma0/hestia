import React, { Component } from 'react'
import { Toolbar, AppBar, IconButton } from '@material-ui/core'

import Menu from '@material-ui/icons/Menu'
import ContestSignature from './contestSignature/contestSignature.js'
import CountdownClock from './clock/clock.js'
import LoginButton from './login/loginButton.js'
import LoginDialog from './login/loginDialog.js'
import UserSettingButton from './userSetting/userSettingButton.js'
import UserSettingMenu from './userSetting/userSettingMenu.js'
import UserSettingDialog from './userSetting/userSettingDialog.js'

import logout from './userSetting/stub/logout.js'

/**
 * @name GlobalStatusBar
 * @description Global sticky status bar at the top of the screen
 * @param {Object <Date, Date>} `contestTime` - Object containing two properties, `start` and `end` representing start & end time
 * @param {String} currentUser currently logged in user
 * @param {boolean} loggedIn true if user has logged in, otherwise false
 * @param {function} menuOpen function to open the menu/sidenav/etc.. (called upon menu button click)
 * @author minhducsun2002
 */

class GlobalStatusBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginDialogOpen: false,
            userMenuOpen: false,
            userSettingDialogOpen: false,
            userMenuAnchorElement: undefined,
        }

        this.closeLoginDialog = this.closeLoginDialog.bind(this)
        this.openUserMenu = this.openUserMenu.bind(this)
        this.closeUserMenu = this.closeUserMenu.bind(this)
        this.closeUserSettingDialog = this.closeUserSettingDialog.bind(this)
        this.openUserSettingDialog = this.openUserSettingDialog.bind(this)
    }

    renderClock() {
        if (this.props.loggedIn)
            // if logged in, show the clock, otherwise hide it
            return (
                <CountdownClock time={this.props.contestTime}>
                </ CountdownClock>
            )
        else return <></>
    }

    renderLoginDialog() {
        return (
            <LoginDialog
                open={
                    this.state.loginDialogOpen && !this.state.loggedIn
                }
                // don't open if logged in
                onClose={this.closeLoginDialog}
            />
        )
    }

    renderUserSettingDialog() {
        return (
            <UserSettingDialog
                user={this.props.currentUser}
                open={this.state.userSettingDialogOpen}
                onClose={this.closeUserSettingDialog}
            />
        )
    }

    closeUserSettingDialog() {
        this.setState({
            userSettingDialogOpen: false,
        })
    }

    openUserSettingDialog() {
        this.setState({
            userSettingDialogOpen: true,
        })
        this.closeUserMenu()
    }

    closeLoginDialog() {
        this.setState({
            loginDialogOpen: false,
        })
    }

    openUserMenu(event) {
        this.setState({
            userMenuAnchorElement: event.currentTarget,
            userMenuOpen: true,
        })
    }

    closeUserMenu() {
        this.setState({
            userMenuOpen: false,
        })
    }

    render() {
        return (
            <>
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton
                            onClick={this.props.menuOpen}
                            style={{
                                marginLeft: -12,
                                marginRight: 12,
                                color: 'white',
                            }}
                        >
                            <Menu />
                        </IconButton>
                        {/* this button opens the sidenav or invoke whatever passed as menuOpen */}

                        <ContestSignature
                            contestName={this.props.contestName}
                        />
                        {this.renderClock()}

                        {!this.props.loggedIn ? (
                            <LoginButton
                                onClick={() =>
                                    this.setState({
                                        loginDialogOpen: true,
                                    })
                                }
                            >
                                {'Log in here'}
                            </LoginButton>
                        ) : (
                            <UserSettingButton
                                user={this.props.currentUser}
                                onClick={this.openUserMenu}
                            />
                        )}
                    </Toolbar>
                </AppBar>

                {this.renderLoginDialog()}

                {this.renderUserSettingDialog()}

                <UserSettingMenu
                    anchorEl={this.state.userMenuAnchorElement}
                    user={this.props.currentUser}
                    open={this.state.userMenuOpen}
                    onClose={this.closeUserMenu}
                    showProfileAction={this.openUserSettingDialog}
                    logoutAction={() =>
                        logout(() => window.location.reload(true))
                    }
                />
            </>
        )
    }
}

export default GlobalStatusBar
