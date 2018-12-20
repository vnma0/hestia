import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

import { Toolbar, AppBar, Typography } from '@material-ui/core';
import { Button, Slide, TextField } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import './front.css';

import {validateID, validateKey} from './login/validate.js';

function slideIn(props, timeout=1000) {
    // slide-in transition for login box
    return <Slide direction="left" timeout={timeout} {...props} />;
    // the transition defaults to 1000 miliseconds, or 1 second.
    // TODO : configurable transition duration
}

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestName : "Kỳ thi 1",
            loggedin : false,

            "login-dialog-open": false,

            id: "",
            validId : true,

            passkeyRef : React.createRef(),
            validPasskey : true
        };

        this.handleUserIDChange = this.handleUserIDChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.performVerification = this.performVerification.bind(this);
        this.login = this.login.bind(this);
        this.loginButton = this.loginButton.bind(this);
        this.loginDialog = this.loginDialog.bind(this);
    }

    loginButton() {
        return (
            <Button color="inherit" onClick={() => {
                this.setState({
                    "login-dialog-open" : true
                    // onClick, open the login dialog box
                })
            }} style={{
                display : !this.state.loggedin
            }}>Log in</Button>
        )
    }
    
    loginDialog = () => {
        return this.state.loggedin ?
            '' : 
            (<Dialog ref="login-dialog"
            open={this.state["login-dialog-open"]} onClose={() => {
                this.setState({
                    "login-dialog-open" : false
                    // if triggered to close, set the props to close
                })
            }} TransitionComponent={slideIn} fullScreen>
            {/* TODO : allow customization for login box size */}
    
                <DialogTitle>Log in</DialogTitle>
    
                <DialogContent>
                    <DialogContentText style={{
                        marginBottom: '5px'
                    }}>
                        Logging in allows solution submissions.
                        {/* should be possible to set languages */}
                    </DialogContentText>
    
                    <TextField autoFocus={true} label="ID" value={this.state.id}
                    onChange={this.handleUserIDChange} 
                    error={!this.state.validId} fullWidth={true}>
                    {/* if invalid ID, must be addressed */}
                    </TextField>
                    
                    <br />
    
                    <TextField label="Authentication key" ref={this.state.passkeyRef}
                    type="password" onChange={this.handleKeyChange}
                    error={!this.state.validPasskey} fullWidth={true}
                    style={{
                        marginBottom: '10px'
                    }}>
                    </TextField>
    
                    <DialogActions>
                        <Button onClick={() => this.setState({
                                "login-dialog-open" : false,
                                // close the dialog
                                validId : true
                                // and then reset the validity of ID
                            })} variant="contained" id="login-cancel">
                            Cancel <CancelIcon className="button-right-icon"/>
                        </Button>
                        <Button onClick={this.performVerification} variant="contained"
                        color="primary" id="login-proceed">
                            Log in <SendIcon className="button-right-icon"/>
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>)
    }

    handleUserIDChange = (event) => {
        this.setState({
            id : event.target.value,
            validId : validateID(event.target.value)
            // the ID must be valid in order to allow authentication
        })
    }

    handleKeyChange = (event) => {
        this.setState({
            validPasskey : validateKey(event.target.value)
            // and so does the authentication key
        })
    }

    performVerification = (event) => {
        if (this.state.validId === false) 
            // Invalid ID encounter :: stop verification IMMEDIATELY
            return;
        this.setState({
            loggedin : this.login(this.state.id, this.state.passkeyRef.current.value)
        })
        this.setState({
            "login-dialog-open" : !this.state.loggedin
            // if logged in, then close the dialog
        })
    }

    login = (username, password) => {
        // returns true if-and-only-if login succeeded.
        return true;
        // TODO : implement logging in ability
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu"
                        style={{
                            marginLeft : -12,
                            marginRight: 12
                        }}><MenuIcon /></IconButton>

                        <Typography variant="h5" color="inherit" style={{
                            flexGrow: 1
                        }}>{this.state.contestName}</Typography>

                        {this.loginButton()}
                    </Toolbar>
                </AppBar>

                {this.loginDialog()}
            </div>
        )
    }
}

export default FrontPage;