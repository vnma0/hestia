import React from 'react'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import Description from '@material-ui/icons/Assignment'

import LocalizedMessage from 'react-l10n';

/**
 * @name ProblemLauncher
 * @description Element to be rendered in the sidenav, responsible for launching submission table
 */

class ProblemLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <Description />
                </ListItemIcon>
                <ListItemText>
                    <LocalizedMessage id="problems.launcher"/>
                </ListItemText>
            </>
        )
    }
}

export default ProblemLauncher
