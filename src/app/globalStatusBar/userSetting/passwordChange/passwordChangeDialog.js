import React, { Component } from 'react';

import { DialogTitle, DialogContent, Dialog, DialogActions, DialogContentText } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import { withGlobalState } from 'react-globally';
import { fade } from '../../lib/libTransition.js';

import passwordChange from '../stub/passwordChange.js';
import { withSnackbar } from 'notistack';
import { withNamespaces } from 'react-i18next';

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
            this.props.enqueueSnackbar(this.props.t('globalStatusBar.userSetting.dialog.entry.password.error'), {
                variant: 'error'
            });
        });
    };

    render() {
        const { t } = this.props;
        return (
            <Dialog
                {...this.props}
                TransitionComponent={this.props.TransitionComponent ? this.props.TransitionComponent : fade}>
                <DialogTitle>
                    {t('globalStatusBar.userSetting.dialog.entry.password.dialog.title')} {this.props.user}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            t('globalStatusBar.userSetting.dialog.entry.password.dialog.notice', {
                                returnObjects: 1
                            })[0]
                        }
                        <br />
                        {
                            t('globalStatusBar.userSetting.dialog.entry.password.dialog.notice', {
                                returnObjects: 1
                            })[1]
                        }
                    </DialogContentText>
                    <TextField
                        label={t('globalStatusBar.userSetting.dialog.entry.password.dialog.labels.old')}
                        type='password'
                        fullWidth
                        onChange={this.handleChangeOldKey}
                        onKeyDown={this.resolveEnterKey}
                    />
                    <br />
                    <TextField
                        label={t('globalStatusBar.userSetting.dialog.entry.password.dialog.labels.new')}
                        type='password'
                        fullWidth
                        onChange={this.handleChangeNewKey}
                        onKeyDown={this.resolveEnterKey}
                    />
                    <br />
                    <TextField
                        label={t('globalStatusBar.userSetting.dialog.entry.password.dialog.labels.verify')}
                        type='password'
                        fullWidth
                        onChange={this.handleChangeKeyVerifier}
                        onKeyDown={this.resolveEnterKey}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>
                        {t('globalStatusBar.userSetting.dialog.entry.password.dialog.controls.cancel')}
                    </Button>
                    <Button
                        disabled={this.state.newKey !== this.state.verifyKey}
                        onClick={this.changePassword}
                        ref={this.state.pwdChangeInvokerRef}>
                        {t('globalStatusBar.userSetting.dialog.entry.password.dialog.controls.proceed')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withNamespaces()(withGlobalState(withSnackbar(PasswordChangeDialog)));
