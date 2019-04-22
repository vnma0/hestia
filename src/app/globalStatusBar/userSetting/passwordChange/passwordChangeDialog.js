import React, { Component } from 'react';

import { DialogTitle, DialogContent, Dialog, DialogActions, DialogContentText } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import { withGlobalState } from 'react-globally';
import { fade } from '../../lib/libTransition.js';

import passwordChange from '../stub/passwordChange.js';
import { withSnackbar } from 'notistack';

import { translations } from '../../../../strings/hestia-l10n/l10n-loader.js';

/**
 * @name PasswordChangeForm
 * @description The password changing dialog.
 *              ALL PROPS WILL BE PASSED DOWN TO <Dialog />
 * @param {function} TransitionComponent : TransitionComponent that the dialog uses.
 *                                         Overrides slideDirection.
 * @param {String} user : user name to display
 * @author minhducsun2002
 */

class PasswordChangeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldKey: '',
            newKey: '',
            verifyKey: '',
            pwdChangeInvokerRef: React.createRef()
        };
    }

    resolveEnterKey = event => {
        if (event.keyCode === 13)
            // if Return (or "Enter" key was pressed)
            // simulate onClick
            this.state.pwdChangeInvokerRef.current.props.onClick();
        /**
         * @author minhducsun2002
         * @desc thank Material UI for making my life tougher by forcing me to touch PROPS
         */
    };

    handleChangeOldKey = event => {
        this.setState({
            oldKey: event.target.value
        });
    };

    handleChangeNewKey = event => {
        this.setState({
            newKey: event.target.value
        });
    };

    handleChangeKeyVerifier = event => {
        this.setState({
            verifyKey: event.target.value
        });
    };

    changePassword = () => {
        passwordChange(this.props.userId, this.state.oldKey, this.state.newKey).catch(() => {
            this.props.enqueueSnackbar(
                translations[this.props.globalState.language].resources.globalStatusBar.userSetting.dialog.entry
                    .password.error,
                { variant: 'error' }
            );
        });
    };

    render() {
        return (
            <Dialog
                {...this.props}
                TransitionComponent={this.props.TransitionComponent ? this.props.TransitionComponent : fade}>
                <DialogTitle>Changing password for {this.props.user}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Password length must be longer than 6 and smaller than 18.
                        <br />
                        Upon successful operation you will be logged out - be careful.
                    </DialogContentText>
                    <TextField
                        label='Old password'
                        type='password'
                        fullWidth
                        onChange={this.handleChangeOldKey}
                        onKeyDown={this.resolveEnterKey}
                    />
                    <br />
                    <TextField
                        label='New password'
                        type='password'
                        fullWidth
                        onChange={this.handleChangeNewKey}
                        onKeyDown={this.resolveEnterKey}
                    />
                    <br />
                    <TextField
                        label='Verifying password'
                        type='password'
                        fullWidth
                        onChange={this.handleChangeKeyVerifier}
                        onKeyDown={this.resolveEnterKey}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button
                        disabled={this.state.newKey !== this.state.verifyKey}
                        onClick={this.changePassword}
                        ref={this.state.pwdChangeInvokerRef}>
                        Change your password
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withGlobalState(withSnackbar(PasswordChangeDialog));
