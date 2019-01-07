import React, {Component} from 'react';
import {Drawer, ListItem, List} from '@material-ui/core';

/**
 * @name Sidenav 
 * @desc Sidebar navigation. All props are passed down to <Drawer>
 * @param {Array : Object(React.Component)} pages : an array with respective React.Component to launch pages onClick
 */

class Sidenav extends Component {
    renderItems() {
        return this.props.pages.map(page => {
            // mirroring onClick function 
            return (
                <ListItem onClick={page.props.onClick} button={page.props.button}>
                    {page}
                </ListItem>
            )
        })
    }
    render() {
        return (
            <Drawer anchor="left" {...this.props}>
                <List>
                    {this.renderItems()}
                </List>
            </Drawer>
        )
    }
}

export default Sidenav;