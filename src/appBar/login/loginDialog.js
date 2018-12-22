import React, {Component} from 'react';
import { DialogTitle, DialogContent, DialogContentText, Dialog, DialogActions, Grid } from '@material-ui/core';
import { TextField, Button, Slide } from '@material-ui/core';

import {validateID, validateKey} from './libValidate.js';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';

/**
 * @name LoginDialog the login dialog
 * @param {boolean} open : the visibility of the dialog
 * @param {function} closeer : the function called when the Cancel button is clicked.
 *                             Should be something that can modify the open state.
 *                             Will be passed directly to the dialog.
 * @param {function} onClose : the function called when the dialog closes.
 * @param {String} slideDirection : direction that the dialog slides in.
 * @example <LoginDialog open={this.state.open} closeer={() => {this.state.open = false}} 
 *           slideDirection={'up'} />
 * 
 * @author minhducsun2002
 */

class LoginDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            validId : true,

            validPasskey : true,
            passkeyRef : React.createRef(),
            passkey: ''
        }


        this.login = this.login.bind(this);
        this.handleUserIDChange = this.handleUserIDChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.slideIn = this.slideIn.bind(this);
    }

    slideIn(props) {
        return <Slide direction={this.props.slideDirection || 'up'} {...props} />;
        // by default the dialog slides upwards
    }   

    login = (event) => {
        if (this.state.validId === false)
            // if invalidID, stop immediately
            return false;
        alert(`You attempted to log in with username
            '${this.state.id}' and password '${this.state.passkey}'`)
        /**
         * @todo Implement log in function & integrate with cookies
         */
    }

    handleUserIDChange = (event) => {
        this.setState({
            id : event.target.value,
            validId : validateID(event.target.value)
        })
    }

    handleKeyChange = (event) => {
        this.setState({
            passkey : event.target.value,
            validPasskey : validateKey(event.target.value)
        })
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}
            TransitionComponent={this.slideIn}>
            
                <DialogTitle>Log in</DialogTitle>
                
                <DialogContent>
                    <DialogContentText>
                        Log in to submit solutions and view problems.
                        {/* TODO : configurable language */}
                    </DialogContentText>

                    <Grid container spacing={16} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField autoFocus={true} label="ID" value={this.state.id}
                            onChange={this.handleUserIDChange} 
                            error={!this.state.validId} fullWidth={true}>
                            {/* if invalid ID, must be addressed */}
                            </TextField>
                        </Grid>
                    </Grid>
                        
                    <br />

                    <Grid container spacing={16} alignItems="flex-end">
                        <Grid item>
                            <Lock />
                        </Grid>
                        <Grid item>
                            <TextField label="Authentication key" ref={this.state.passkeyRef}
                                type="password" onChange={this.handleKeyChange}
                                value={this.state.passkey}
                                error={!this.state.validPasskey} fullWidth={true}>
                            </TextField>
                        </Grid>
                    </Grid>

                </DialogContent>
                
                <DialogActions>
                    <Button onClick={this.props.closeer}>
                        Cancel
                    </Button>
                    <Button onClick={this.login}>
                        Log in
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default LoginDialog;