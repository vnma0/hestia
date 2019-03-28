import React, { Component } from 'react'

import {
    DialogTitle,
    DialogContent,
    Dialog,
    DialogActions,
    AppBar,
    Tabs,
    Tab,
} from '@material-ui/core'
import { Button } from '@material-ui/core'

import * as Cookies from 'js-cookie';

import PasswordChangeDialog from './passwordChange/passwordChangeDialog.js'
import LocaleChange from './localeChange/localeChange.js';
import { fade } from '../lib/libTransition.js'

import { supportedLanguages } from '../../../l10n-loader.js';

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
        super(props)
        this.state = {
            currentTab: 0,
            pwdChangeDialogOpen: false,

            language: Cookies.get('language')
        }

        this.submitOptions = this.submitOptions.bind(this);
    }

    submitOptions() {
        Cookies.set('language', this.state.language);
        this.props.onClose()
    }


    render() {
        return (
            <>
                <Dialog
                    {...this.props}
                    TransitionComponent={
                        this.props.TransitionComponent
                            ? this.props.TransitionComponent
                            : fade
                    }
                >
                    <DialogTitle>
                        User settings{' '}
                        {this.props.user ? `for ${this.props.user}` : ''}
                    </DialogTitle>
                    <DialogContent>
                        <AppBar position="static">
                            <Tabs
                                value={this.state.currentTab}
                                fullWidth
                                onChange={(e, v) => this.setState({ currentTab: v })}>
                                <Tab label="Password" />
                                <Tab label="Languages"/>
                            </Tabs>
                        </AppBar>
                        {this.state.currentTab === 0 && (
                            <div align="center" style={{ marginTop: 10 }}>
                                <Button
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                    }}
                                    onClick={() =>
                                        this.setState({
                                            pwdChangeDialogOpen: true,
                                        })
                                    }
                                >
                                    Change your password
                                </Button>
                            </div>
                        )}
                        {this.state.currentTab === 1 && (
                            <LocaleChange
                                languages={supportedLanguages}
                                choice={this.state.language}
                                onChange={(event, arg) => this.setState({ language: arg })}/>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose}>Cancel</Button>
                        <Button onClick={this.submitOptions}>Save</Button>
                    </DialogActions>
                </Dialog>
                <PasswordChangeDialog
                    open={this.state.pwdChangeDialogOpen}
                    slideDirection="left"
                    userId={this.props.userId}
                    onClose={() =>
                        this.setState({
                            pwdChangeDialogOpen: false,
                        })
                    }
                />
            </>
        )
    }
}

export default UserSettingDialog
