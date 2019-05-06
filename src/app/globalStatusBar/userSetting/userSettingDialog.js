import React, { Component } from 'react';

import { DialogTitle, DialogContent, Dialog, DialogActions, AppBar, Tabs, Tab } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { withGlobalState } from 'react-globally';

import PasswordChangeDialog from './passwordChange/passwordChangeDialog.js';
import LocaleChange from './localeChange/localeChange.js';
import { fade } from '../lib/libTransition.js';

import { supportedLanguages } from '../../../strings/hestia-l10n/l10n-loader.js';
import { withNamespaces } from 'react-i18next';

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
    }

    submitOptions = () => {
        localStorage.setItem('language', this.props.globalState.language);
        this.props.onClose();
    };

    onClose = () => {
        this.props.setGlobalState({ language: localStorage.getItem('language') });
        this.props.i18n.changeLanguage(localStorage.getItem('language'));
        this.props.onClose();
    };

    render() {
        const { t } = this.props;
        return (
            <>
                <Dialog
                    {...this.props}
                    TransitionComponent={this.props.TransitionComponent ? this.props.TransitionComponent : fade}>
                    <DialogTitle>
                        {this.props.user
                            ? `${t('globalStatusBar.userSetting.dialog.title.userPresent')}${this.props.user}`
                            : t('globalStatusBar.userSetting.dialog.title.userAbsent')}
                    </DialogTitle>
                    <DialogContent>
                        <AppBar position='static'>
                            <Tabs
                                value={this.state.currentTab}
                                fullWidth
                                onChange={(e, v) => this.setState({ currentTab: v })}>
                                {/* we only care about the target value, ignore the event passed */}
                                <Tab label={t('globalStatusBar.userSetting.dialog.entry.password.title')} />
                                <Tab label={t('globalStatusBar.userSetting.dialog.entry.language.title')} />
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
                                    {t('globalStatusBar.userSetting.dialog.entry.password.invokingButton')}
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
                                        this.props.i18n.changeLanguage(arg);
                                    }}
                                />
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>{t('globalStatusBar.userSetting.dialog.options.cancel')}</Button>
                        <Button onClick={this.submitOptions}>
                            {t('globalStatusBar.userSetting.dialog.options.save')}
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

export default withNamespaces()(withGlobalState(UserSettingDialog));
