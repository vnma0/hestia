import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import Send from '@material-ui/icons/Send';

/**
 * @name SubmissionLauncher
 * @description Element to be rendered in the sidenav, responsible for launching submission table
 */

class SubmissionLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <Send />
                </ListItemIcon>
                <ListItemText>
                    Submissions
                </ListItemText>
            </>
        )
    }
}

export default SubmissionLauncher;