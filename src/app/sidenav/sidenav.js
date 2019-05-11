import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, ListItem, List } from '@material-ui/core';

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
            open: false
        };

        toggleSidenav = this.toggle;
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        return (
            <Drawer anchor='left' {...this.props} open={this.state.open} onClose={this.toggle}>
                <List>
                    {this.props.children.map(({ link, page }, index) => (
                        <ListItem
                            component={Link}
                            to={link}
                            onClick={page.props.onClick}
                            button={page.props.button}
                            key={`navigator_${index}`}>
                            {page}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }
}

export default Sidenav;
