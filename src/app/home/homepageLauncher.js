import React from 'react'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import Send from '@material-ui/icons/Send'

/**
 * @name HomepageLauncher
 * @description Element to be rendered in the sidenav, responsible for launching home page
 */

class HomepageLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <Send />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
            </>
        )
    }
}

export default HomepageLauncher
