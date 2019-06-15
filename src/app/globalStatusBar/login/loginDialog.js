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
        const { t, TransitionComponent, onClose, enqueueSnackbar } = this.props;
        const { loginInProgress, validId, id, passkey, validPasskey } = this.state;
        return (
            <Dialog
                {...this.props}
                disableEscapeKeyDown={loginInProgress}
                disableBackdropClick={loginInProgress}
                // if logging in, no exiting
                TransitionComponent={TransitionComponent ? TransitionComponent : fade}>
                <DialogTitle>{t('globalStatusBar.login.dialog.title')}</DialogTitle>

                <DialogContent>
                    <DialogContentText>{t('globalStatusBar.login.dialog.greeting')}</DialogContentText>

                    <Grid container spacing={16} alignItems='flex-end'>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField
                                disabled={loginInProgress} /* disable if logging in */
                                autoFocus={true}
                                label={t('globalStatusBar.login.dialog.usernameHint')}
                                value={id}
                                onChange={this.handleUserIDChange}
                                fullWidth={true}
                                error={!validId} /* if invalid ID, must be addressed */
                                onKeyDown={this.resolveEnterKey}
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
                                disabled={loginInProgress}
                                label={t('globalStatusBar.login.dialog.passkeyHint')}
                                ref={this.state.passkeyRef}
                                type='password'
                                onChange={this.handleKeyChange}
                                value={passkey}
                                fullWidth={true}
                                error={!validPasskey}
                                onKeyDown={this.resolveEnterKey}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button disabled={loginInProgress} onClick={onClose}>
                        {t('globalStatusBar.login.dialog.options.cancel')}
                    </Button>
                    <Button
                        disabled={loginInProgress}
                        onClick={() => {
                            login(id, passkey).then(success => {
                                this.setState({
                                    loginInProgress: false
                                });
                                if (success) {
                                    enqueueSnackbar(t('globalStatusBar.login.dialog.successText'), {
                                        variant: 'success'
                                    });
                                    setTimeout(() => window.location.reload(true), 500);
                                } else
                                    enqueueSnackbar(t('globalStatusBar.login.dialog.errorText'), {
                                        variant: 'error'
                                    });
                            });
                            // if login finished, hide the loading circle
                            this.setState({
                                loginInProgress: true
                            });
                        }}
                        ref={this.state.loginInvokerRef}>
                        {loginInProgress ? (
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
