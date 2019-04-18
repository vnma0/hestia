import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import DoneAll from '@material-ui/icons/CheckCircleOutline';

import LocalizedMessage from 'react-l10n';

/**
 * @name SubmissionLauncher
 * @description Element to be rendered in the sidenav, responsible for launching submission table
 */

class SubmissionLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <DoneAll />
                </ListItemIcon>
                <ListItemText>
                    <LocalizedMessage id='submissions.launcher' />
                </ListItemText>
            </>
        );
    }
}

export default SubmissionLauncher;
