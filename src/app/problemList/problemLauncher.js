import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import Send from '@material-ui/icons/Send';

/**
 * @name ProblemLauncher
 * @description Element to be rendered in the sidenav, responsible for launching submission table
 */

class ProblemLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <Send />
                </ListItemIcon>
                <ListItemText>
                    Problems
                </ListItemText>
            </>
        )
    }
}

export default ProblemLauncher;