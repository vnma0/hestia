import React, { Component } from 'react'
import { Drawer, ListItem, List } from '@material-ui/core'

/**
 * @name Sidenav
 * @desc Sidebar navigation. All props are passed down to <Drawer>
 * @param {Array : Object(React.Component)} pages : an array with respective React.Component to launch pages onClick
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
        return this.props.pages.map((page, index) => {
            // mirroring onClick function
            return (
                <ListItem
                    onClick={page.props.onClick}
                    button={page.props.button}
                    key={`navigator_${index}`}
                >
                    {page}
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
