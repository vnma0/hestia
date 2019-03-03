import React from 'react'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import Home from '@material-ui/icons/Home'

/**
 * @name HomepageLauncher
 * @description Element to be rendered in the sidenav, responsible for launching home page
 */

class HomepageLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
            </>
        )
    }
}

export default HomepageLauncher
