import React, { Component } from 'react';
import { Toolbar, AppBar, IconButton } from '@material-ui/core';

import Menu from '@material-ui/icons/Menu';

import ContestSignature from './contestSignature/contestSignature.js';
import CountdownClock from './clock/clock.js';
import LoginButton from './login/loginButton.js';
import LoginDialog from './login/loginDialog.js';
import UserSettingButton from './userSetting/userSettingButton.js';
import UserSettingMenu from './userSetting/userSettingMenu.js';
import UserSettingDialog from './userSetting/userSettingDialog.js';

import logout from './userSetting/stub/logout.js';
import { withNamespaces } from 'react-i18next';

/**
 * @name GlobalStatusBar
 * @description Global sticky status bar at the top of the screen
 * @param {Object <Date, Date>} `contestTime` - Object containing two properties, `start` and `end` representing start & end time
 * @param {String} currentUser currently logged in user
 * @param {String} currentUserId currently logged in user ID
 * @param {Boolean} loggedIn true if user has logged in, false otherwise
 * @param {Function} menuOpen function to open the menu/sidenav/etc.. (called upon menu button click)
 * @param {Boolean} isAdmin true if user has logged in, false otherwise
 * @author minhducsun2002
 */

class GlobalStatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDialogOpen: false,
            userMenuOpen: false,
            userSettingDialogOpen: false,
            userMenuAnchorElement: undefined
        };
    }

    renderLoginDialog() {
        return (
            <LoginDialog
                open={this.state.loginDialogOpen && !this.state.loggedIn}
                // don't open if logged in
                onClose={() =>
                    this.setState({
                        loginDialogOpen: false
                    })
                }
            />
        );
    }

    renderUserSettingDialog() {
        return (
            <UserSettingDialog
                userId={this.props.currentUserId}
                user={this.props.currentUser}
                open={this.state.userSettingDialogOpen}
                onClose={() =>
                    this.setState({
                        userSettingDialogOpen: false
                    })
                }
            />
        );
    }

    openUserSettingDialog = () => {
        this.setState({
            userSettingDialogOpen: true
        });
        this.closeUserMenu();
    };

    openUserMenu = event => {
        this.setState({
            userMenuAnchorElement: event.currentTarget,
            userMenuOpen: true
        });
    };

    closeUserMenu = () => {
        this.setState({
            userMenuOpen: false
        });
    };

    render() {
        const { t, isAdmin, loggedIn } = this.props;
        return (
            <>
                <AppBar position='sticky'>
                    <Toolbar>
                        <IconButton
                            onClick={this.props.menuOpen}
                            style={{
                                marginLeft: -12,
                                marginRight: 12,
                                color: 'white'
                            }}>
                            <Menu />
                        </IconButton>
                        {/* this button opens the sidenav or invoke whatever passed as menuOpen */}

                        <ContestSignature contestName={this.props.contestName} />
                        <span style={{ flexGrow: 1 }} />
                        {loggedIn && <CountdownClock time={this.props.contestTime} />}

                        {!this.props.loggedIn ? (
                            <LoginButton
                                onClick={() =>
                                    this.setState({
                                        loginDialogOpen: true
                                    })
                                }>
                                {t('globalStatusBar.login.invokingButton')}
                            </LoginButton>
                        ) : (
                            <UserSettingButton onClick={this.openUserMenu} isAdmin={isAdmin} />
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
                    logoutAction={logout}
                />
            </>
        );
    }
}

export default withNamespaces()(GlobalStatusBar);
