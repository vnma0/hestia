import React, { PureComponent } from 'react';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VerifiedUser from '@material-ui/icons/VerifiedUser';

import './userSettingButton.css';

/**
 * @name UserSettingButton
 * @description A button triggering some user options
 * @param {Boolean} isAdmin whether the user is an admin
 * @return {React.Component} A '@material-ui/core/Button' component with AccountCircle icon
 */

class UserSettingButton extends PureComponent {
    render() {
        const { isAdmin, ...passed } = this.props;
        const svgClassName = 'user-setting-btn-svg';
        return (
            <>
                <IconButton className='user-setting-btn' {...passed}>
                    {isAdmin ? <AccountCircle className={svgClassName} /> : <VerifiedUser className={svgClassName} />}
                </IconButton>
            </>
        );
    }
}

export default UserSettingButton;
