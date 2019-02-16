import React, { Component } from 'react'
import { Menu, MenuItem } from '@material-ui/core'

/**
 * @name UserSettingMenu
 * @description A drop-down menu that allows (for now) changing profile settings & logging out
 * @param {function} showProfileAction Function to show profile [settings] page
 * @param {function} logoutAction Function to log out
 * @param {String} user User to greet
 * @return {React.Component} A '@material-ui/core/Menu' element with two options
 * @author minhducsun2002
 */

class UserSettingMenu extends Component {
    render() {
        return (
            <Menu {...this.props}>
                <MenuItem disabled>Welcome back, {this.props.user}</MenuItem>
                <MenuItem onClick={this.props.showProfileAction}>
                    Change user settings
                </MenuItem>
                <MenuItem onClick={this.props.logoutAction}>Log out</MenuItem>
            </Menu>
        )
    }
}

export default UserSettingMenu
