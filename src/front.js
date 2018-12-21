import React, { Component } from 'react';

import { Toolbar, AppBar, Typography, Button } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

import './front.css';

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestName : "Kỳ thi 1",
            loggedin : false,
            id : "",
            displayName : "user"
        };
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" color="inherit" style={{
                            flexGrow: 1
                        }}>{this.state.contestName}</Typography>
                        {this.state.loggedin ?
                            // if logged in, render a button
                            // that allows information changes
                            <Button color="inherit">
                                <Typography color="inherit">
                                    {this.state.displayName}
                                </Typography>
                                <AccountCircle style={{
                                        marginLeft: '5px'
                                    }}/>
                            </Button> :
                            // else just throw a login link
                            <Button>


                            </Button>}
                            
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default FrontPage;
