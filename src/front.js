import React, { Component } from 'react';

import { Toolbar, AppBar, Typography, Button } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

import LoginPage from './login/login.js';
import CountdownClock from './login/clock';
import './front.css';

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestName : "Kỳ thi 1",
            contestDuration : '00:00:05',
            contestTimeLeft : '00:00:01',
            loggedin : false,
            id : "",
            displayName : "user"
        };
    }

    contestNameRenderer() {
        return (<Typography variant="h5" color="inherit" style={{
                flexGrow: 1
            }}>{this.state.contestName}</Typography>)
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {this.contestNameRenderer()}
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
                            <Button></Button>}
                            {/* TODO : Log in button */}

                        {/* serve as a clock */}
                        <CountdownClock
                        timeLeft={this.state.contestTimeLeft} duration={this.state.contestDuration}/>
                    </Toolbar>
                </AppBar>
                <div style={{marginTop : '10px'}}>
                    <div style={{
                        width : '48%', display : 'inline-block',
                        height : '100%', float : 'left'
                    }} align="right">
                        <div id="contest-name">{this.state.contestName}</div>
                        {/* testing image, should be redirected later */}
                        <img style={{
                            width : '300px',
                            right : '0'
                        }} src={"https://www.materialui.co/materialIcons/action/code_black_192x192.png"}></img>
                        <div>Kudos to <i>guess who</i></div>
                    </div>
                    <div style={{
                        display : 'inline-block',
                    }}>
                        <hr style={{
                            borderLeft: '2px solid black',
                            height: '500px',
                            float : 'left', width : '0px',
                            display : 'inline-block',
                            padding : '0', marginTop: '0',
                            marginLeft : '10px', marginRight : '10px'
                        }} />
                        <div style={{
                            display : 'inline-block',
                            verticalAlign : 'middle'
                        }}>
                            <LoginPage />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FrontPage;
