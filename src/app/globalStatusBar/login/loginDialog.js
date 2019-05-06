import React, { Component } from 'react';
import { DialogTitle, DialogContent, DialogContentText, Dialog, DialogActions, Grid } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { withGlobalState } from 'react-globally';

import { validateID, validateKey } from '../lib/libValidateLogin.js';

import AccountCircle from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Lock from '@material-ui/icons/Lock';
import { fade } from '../lib/libTransition.js';

import login from './stub/login.js';

import { withNamespaces } from 'react-i18next';

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
            id: '',
            validId: true,

            validPasskey: true,
            passkeyRef: React.createRef(),
            passkey: '',

            loginInvokerRef: React.createRef(),
            testRef: React.createRef(),

            loginInProgress: false,
            errorLogin: false
        };
    }

    resolveEnterKey = event => {
        if (event.keyCode === 13)
            // if Return (or "Enter" key was pressed)
            // simulate onClick
            this.state.loginInvokerRef.current.props.onClick();
        /**
         * @author minhducsun2002
         * @desc thank Material UI for making my life tougher by forcing me to touch PROPS
         */
    };

    handleUserIDChange = event => {
        this.setState({
            id: event.target.value,
            validId: validateID(event.target.value)
        });
    };

    handleKeyChange = event => {
        this.setState({
            passkey: event.target.value,
            validPasskey: validateKey(event.target.value)
        });
    };

    render() {
        const { t } = this.props;
        return (
            <Dialog
                {...this.props}
                disableEscapeKeyDown={this.state.loginInProgress}
                disableBackdropClick={this.state.loginInProgress}
                // if logging in, no exiting
                TransitionComponent={this.props.TransitionComponent ? this.props.TransitionComponent : fade}>
                <DialogTitle>{t('globalStatusBar.login.dialog.title')}</DialogTitle>

                <DialogContent>
                    <DialogContentText>{t('globalStatusBar.login.dialog.greeting')}</DialogContentText>

                    <Grid container spacing={16} alignItems='flex-end'>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField
                                autoFocus={true}
                                label={t('globalStatusBar.login.dialog.usernameHint')}
                                value={this.state.id}
                                onChange={this.handleUserIDChange}
                                fullWidth={true}
                                error={!this.state.validId} /* if invalid ID, must be addressed */
                                onKeyDown={this.resolveEnterKey}
                                ref={this.state.testRef}
                            />
                        </Grid>
                    </Grid>

                    <br />

                    <Grid container spacing={16} alignItems='flex-end'>
                        <Grid item>
                            <Lock />
                        </Grid>
                        <Grid item>
                            <TextField
                                label={t('globalStatusBar.login.dialog.passkeyHint')}
                                ref={this.state.passkeyRef}
                                type='password'
                                onChange={this.handleKeyChange}
                                value={this.state.passkey}
                                fullWidth={true}
                                error={!this.state.validPasskey}
                                onKeyDown={this.resolveEnterKey}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button disabled={this.state.loginInProgress} onClick={this.props.onClose}>
                        {t('globalStatusBar.login.dialog.options.cancel')}
                    </Button>
                    <Button
                        disabled={this.state.loginInProgress}
                        onClick={() => {
                            login(this.state.id, this.state.passkey).then(success => {
                                this.setState({
                                    loginInProgress: false
                                });
                                if (success) window.location.reload();
                                else
                                    this.props.enqueueSnackbar(t('globalStatusBar.login.dialog.errorText'), {
                                        variant: 'error'
                                    });
                            });
                            // if login finished, hide the loading circle
                            this.setState({
                                loginInProgress: true
                            });
                        }}
                        ref={this.state.loginInvokerRef}>
                        {this.state.loginInProgress ? (
                            <CircularProgress size={20} />
                        ) : (
                            t('globalStatusBar.login.dialog.options.login')
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withNamespaces()(withGlobalState(withSnackbar(LoginDialog)));
