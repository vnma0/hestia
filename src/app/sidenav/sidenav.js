import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Drawer, ListItem, List } from '@material-ui/core'

/**
 * @name Sidenav
 * @desc Sidebar navigation. All props are passed down to <Drawer>
 * @param {Array <Object({React.Component, link})>} pages : an array with respective React.Component to launch pages with desired link
 */

export let toggleSidenav;

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false
        }

        toggleSidenav = this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            open: !this.state.open
        })
    }

    renderItems() {
        return this.props.pages.map((entry, index) => {
            // mirroring onClick function
            return (
                <ListItem component={Link} to={entry.link}
                    onClick={entry.page.props.onClick}
                    button={entry.page.props.button}
                    key={`navigator_${index}`}>
                    {entry.page}
                </ListItem>
            )
        })
    }
    render() {
        return (
            <Drawer anchor="left" {...this.props} open={this.state.open}
                onClose={this.toggle}>
                <List>{this.renderItems()}</List>
            </Drawer>
        )
    }
}

export default Sidenav
