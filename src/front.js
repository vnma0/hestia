import React, { Component } from 'react';
import './front.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Toolbar, AppBar, Typography, Button, TextField } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

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
    }

    validateID = (text : String) => {
        return !(/\s/.test(text)) && text.length !== 0
        // the ID will be deemed invalid if at least one of these conditions is met:
        // - Contains any kind of whitespaces, including newlines and tabs..
        // - Empty
    }

    validateKey = (text : String) => {
        return (
            // text.length !== 0
            true
        )
        // it is possible to use empty passwords.
        // TODO : fetch password policy from server
    }

    handleUserIDChange = (event) => {
        this.setState({
            id : event.target.value,
            validId : this.validateID(event.target.value)
            // the ID must be valid in order to allow authentication
        })
    }

    handleKeyChange = (event) => {
        this.setState({
            validPasskey : this.validateKey(event.target.value)
            // and so does the authentication key
        })
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
                        }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" color="inherit" style={{
                            flexGrow: 1
                        }}>
                            {this.state.contestName}
                        </Typography>

                        <Button color="inherit"
                        onClick={() => {
                            this.setState({
                                "login-dialog-open" : true
                                // onClick, open the login dialog box
                            })
                        }}>
                            Log in
                        </Button>
                    </Toolbar>
                </AppBar>

                <Dialog ref="login-dialog"
                open={this.state["login-dialog-open"]}
                onClose={() => {
                    this.setState({
                        "login-dialog-open" : false
                        // if triggered to close, set the props to close
                    })
                }}
                >
                    <DialogTitle>Log in</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
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
                        error={!this.state.validPasskey} fullWidth={true}>
                        </TextField>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default FrontPage;