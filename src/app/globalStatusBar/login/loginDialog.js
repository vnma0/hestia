import React, {Component} from 'react';
import { DialogTitle, DialogContent, DialogContentText, Dialog, DialogActions, Grid } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';

import {validateID, validateKey} from '../lib/libValidateLogin.js';
import VerdictSignature from '../../submissions/signature/verdictSignature.js'

import AccountCircle from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Lock from '@material-ui/icons/Lock';
import {fade} from '../lib/libTransition.js';

import login from './stub/login.js'

/**
 * @name LoginDialog 
 * @description The login dialog.
 *              ALL PROPS WILL BE PASSED DOWN TO <Dialog />
 * @param {String} slideDirection : direction that the dialog slides in.
 * @param {function} TransitionComponent : TransitionComponent that the dialog uses.
 *                                         Overrides slideDirection.
 * @example <LoginDialog open={this.state.open} onClose={() => {this.state.open = false}} 
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
            passkey: '',

            loginInvokerRef: React.createRef(),
            testRef: React.createRef(),

            loginInProgress : false,
            errorLogin : false
        }
        this.handleUserIDChange = this.handleUserIDChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.resolveEnterKey = this.resolveEnterKey.bind(this);
    }

    resolveEnterKey = (event) => {
        if (event.keyCode === 13)
            // if Return (or "Enter" key was pressed)
            // simulate onClick
            this.state.loginInvokerRef.current.props.onClick()
            /**
             * @author minhducsun2002
             * @desc thank Material UI for making my life tougher by forcing me to touch PROPS 
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
            <Dialog {...this.props}
            TransitionComponent={this.props.TransitionComponent
                ? this.props.TransitionComponent : fade}>
            
                <DialogTitle>
                    {this.state.errorLogin ? 'Error logging in.' : 'Log in'}
                </DialogTitle>
                
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
                            onChange={this.handleUserIDChange} fullWidth={true}
                            error={!this.state.validId} /* if invalid ID, must be addressed */
                            onKeyDown={this.resolveEnterKey}
                            ref={this.state.testRef}
                            >
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
                                value={this.state.passkey} fullWidth={true}
                                error={!this.state.validPasskey} onKeyDown={this.resolveEnterKey}>
                            </TextField>
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button disabled={this.state.loginInProgress} 
                        onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button disabled={this.state.loginInProgress} onClick={() => {
                        login(this.state.id, this.state.passkey, () => 
                            this.setState({
                                loginInProgress : false,
                                errorLogin : !window.hestia.loggedIn
                            })) && this.forceUpdate()
                            // if login finished, hide the loading circle
                        this.setState({
                            loginInProgress : true
                        })
                    }} ref={this.state.loginInvokerRef}>
                        {this.state.loginInProgress
                            ? <CircularProgress size={20}/> : "Log in"}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default LoginDialog;