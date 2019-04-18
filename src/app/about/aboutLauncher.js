import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import Send from '@material-ui/icons/Send';

/**
 * @name AboutLauncher
 * @description Element to be rendered in the sidenav, responsible for launching About page
 */

class AboutLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <Send />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
            </>
        );
    }
}

export default AboutLauncher;
