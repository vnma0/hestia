import React, { Component } from 'react';

import { DialogTitle, DialogContent, Dialog, DialogActions, AppBar, Tabs, Tab } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { withGlobalState } from 'react-globally';

import PasswordChangeDialog from './passwordChange/passwordChangeDialog.js';
import LocaleChange from './localeChange/localeChange.js';
import { fade } from '../lib/libTransition.js';

import { supportedLanguages } from '../../../strings/hestia-l10n/l10n-loader.js';

import LocalizedMessage from 'react-l10n';

/**
 * @name UserSettingDialog
 * @description Dialog to change user settings.
 *              ALL PROPS WILL BE PASSED DOWN TO <Dialog />
 * @param {String} user Username
 * @param {function} TransitionComponent : TransitionComponent that the dialog uses.
 *                                         Overrides slideDirection.
 * @returns {<Dialog />} A '@material-ui/core/Dialog' component
 * @author minhducsun2002
 */

class UserSettingDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            pwdChangeDialogOpen: false
        };

        this.submitOptions = this.submitOptions.bind(this);
    }

    submitOptions() {
        localStorage.setItem('language', this.props.globalState.language);
        this.props.onClose();
    }

    render() {
        return (
            <>
                <Dialog
                    {...this.props}
                    TransitionComponent={this.props.TransitionComponent ? this.props.TransitionComponent : fade}>
                    <DialogTitle>
                        {this.props.user ? (
                            <>
                                <LocalizedMessage id='globalStatusBar.userSetting.dialog.title.userPresent' />
                                {this.props.user}
                            </>
                        ) : (
                            <LocalizedMessage id='globalStatusBar.userSetting.dialog.title.userAbsent' />
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <AppBar position='static'>
                            <Tabs
                                value={this.state.currentTab}
                                fullWidth
                                onChange={(e, v) => this.setState({ currentTab: v })}>
                                {/* we only care about the target value, ignore the event passed */}
                                <Tab
                                    label={
                                        <LocalizedMessage id='globalStatusBar.userSetting.dialog.entry.password.title' />
                                    }
                                />
                                <Tab
                                    label={
                                        <LocalizedMessage id='globalStatusBar.userSetting.dialog.entry.language.title' />
                                    }
                                />
                            </Tabs>
                        </AppBar>
                        {this.state.currentTab === 0 && (
                            <div align='center' style={{ marginTop: 10 }}>
                                <Button
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white'
                                    }}
                                    onClick={() =>
                                        this.setState({
                                            pwdChangeDialogOpen: true
                                        })
                                    }>
                                    <LocalizedMessage id='globalStatusBar.userSetting.dialog.entry.password.invokingButton' />
                                </Button>
                            </div>
                        )}
                        {this.state.currentTab === 1 && (
                            <>
                                <LocaleChange
                                    languages={supportedLanguages}
                                    choice={this.props.globalState.language}
                                    onChange={(event, arg) => {
                                        this.props.setGlobalState({ language: arg });
                                    }}
                                />
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose}>
                            <LocalizedMessage id='globalStatusBar.userSetting.dialog.options.cancel' />
                        </Button>
                        <Button onClick={this.submitOptions}>
                            <LocalizedMessage id='globalStatusBar.userSetting.dialog.options.save' />
                        </Button>
                    </DialogActions>
                </Dialog>
                <PasswordChangeDialog
                    open={this.state.pwdChangeDialogOpen}
                    slideDirection='left'
                    userId={this.props.userId}
                    onClose={() =>
                        this.setState({
                            pwdChangeDialogOpen: false
                        })
                    }
                />
            </>
        );
    }
}

export default withGlobalState(UserSettingDialog);
