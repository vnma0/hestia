import React, { Component } from 'react'
import { Menu, MenuItem } from '@material-ui/core'

import PropTypes from 'prop-types'

import LocalizedMessage from 'react-l10n';

/**
 * @name UserSettingMenu
 * @description A drop-down menu that allows (for now) changing profile settings & logging out
 * @param {function} `showProfileAction` - Function to show profile/settings/etc. page
 * @param {function} `logoutAction` - Function to log out
 * @param {String} `user` - User to greet
 * @param {Boolean} `open` - Whether the menu is open
 * @param {Function} `onClose` - callback firing upon the menu requests to be closed
 * @param {} `anchorEl` - DOM element to set menu position; see https://material-ui.com/api/menu.
 * @return {React.Component} A `@material-ui/core/Menu` element with two options
 * @author minhducsun2002
 */

class UserSettingMenu extends Component {
    render() {
        return (
            <Menu open={this.props.open} anchorEl={this.props.anchorEl}
                onClose={this.props.onClose}>
                <MenuItem disabled>
                    <LocalizedMessage id="globalStatusBar.userSetting.menu.greeting"/>
                    {this.props.user}
                </MenuItem>
                <MenuItem onClick={this.props.showProfileAction}>
                    <LocalizedMessage id="globalStatusBar.userSetting.menu.change-user-settings"/>
                </MenuItem>
                <MenuItem onClick={this.props.logoutAction}>
                    <LocalizedMessage id="globalStatusBar.userSetting.menu.logout"/>
                </MenuItem>
            </Menu>
        )
    }
}

UserSettingMenu.propTypes = {
    showProfileAction : PropTypes.func,
    logoutAction: PropTypes.func,
    user: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default UserSettingMenu
