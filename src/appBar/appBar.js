import React, { Component } from 'react';
import { Toolbar, AppBar, Typography, IconButton } from '@material-ui/core';

import Menu from '@material-ui/icons/Menu';
import ContestSignature from './contestSignature/contestSignature.js';

class GlobalStatusBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={this.props.menuOpen} style={{
                        marginLeft : -12,
                        marginRight : 12
                    }}><Menu /></IconButton>
                    {/* this button opens the sidenav or invoke whatever passed as menuOpen */}

                    <ContestSignature contestName={this.props.contestName} />
                </Toolbar>
            </AppBar>
        )
    }
}

export default GlobalStatusBar;