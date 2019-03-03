import React from 'react'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import Description from '@material-ui/icons/Assignment'

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
                <ListItemText>Problems</ListItemText>
            </>
        )
    }
}

export default ProblemLauncher
