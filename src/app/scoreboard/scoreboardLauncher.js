import React from 'react'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import Send from '@material-ui/icons/Send'

/**
 * @name ScoreboardLauncher
 * @description Element to be rendered in the sidenav, responsible for launching scoreboard table
 */

class ScoreboardLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <Send />
                </ListItemIcon>
                <ListItemText>Scoreboard</ListItemText>
            </>
        )
    }
}

export default ScoreboardLauncher
