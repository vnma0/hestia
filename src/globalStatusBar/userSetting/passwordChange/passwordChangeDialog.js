import React, {Component} from 'react';

import { DialogTitle, DialogContent, Dialog, DialogActions } from '@material-ui/core';
import { Slide, Button, TextField } from '@material-ui/core'
import {fade} from '../../lib/libTransition.js';

/**
 * @name PasswordChangeForm
 * @description The password changing dialog.
 *              ALL PROPS WILL BE PASSED DOWN TO <Dialog />
 * @param {function} TransitionComponent : TransitionComponent that the dialog uses.
 *                                         Overrides slideDirection.
 * @param {String} user : user name to display
 * @example <PasswordChangeDialog open={this.state.open} onClose={() => {this.state.open = false}} 
 *           slideDirection={'up'} />
 * @author minhducsun2002
 */

class PasswordChangeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldKey: '',
            newKey: '',
            verifyKey: '',
            pwdChangeInvokerRef : React.createRef()
        }
        this.changePassword = this.changePassword.bind(this);

        this.handleChangeKeyVerifier = this.handleChangeKeyVerifier.bind(this);
        this.handleChangeOldKey = this.handleChangeOldKey.bind(this);
        this.handleChangeNewKey = this.handleChangeNewKey.bind(this);

        this.resolveEnterKey = this.resolveEnterKey.bind(this);
    }

    resolveEnterKey = (event) => {
        if (event.keyCode === 13)
            // if Return (or "Enter" key was pressed)
            // simulate onClick
            this.state.pwdChangeInvokerRef.current.props.onClick()
            /**
             * @author minhducsun2002
             * @desc thank Material UI for making my life tougher by forcing me to touch PROPS 
             */
            
    }

    handleChangeOldKey(event) {
        this.setState({
            oldKey : event.target.value
        })
    }

    handleChangeNewKey(event) {
        this.setState({
            newKey : event.target.value
        })
    }

    handleChangeKeyVerifier(event) {
        this.setState({
            verifyKey : event.target.value
        })
    }

    changePassword() {
        alert(`You attempted to change password from '${this.state.oldKey}'` 
                + ` to '${this.state.newKey}'` +
                ` and verified with '${this.state.verifyKey}'`)
    }

    render() {
        return (
            <Dialog {...this.props}
            TransitionComponent={this.props.TransitionComponent
                ? this.props.TransitionComponent : fade}>
                <DialogTitle>
                    Changing password for {this.props.user}
                </DialogTitle>
                <DialogContent >
                    <TextField label="Old password" type="password" fullWidth 
                    onChange={this.handleChangeOldKey} onKeyDown={this.resolveEnterKey}/><br />
                    <TextField label="New password" type="password" fullWidth 
                    onChange={this.handleChangeNewKey} onKeyDown={this.resolveEnterKey}/><br />
                    <TextField label="Verifying password" type="password" fullWidth 
                    onChange={this.handleChangeKeyVerifier} onKeyDown={this.resolveEnterKey}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.changePassword} ref={this.state.pwdChangeInvokerRef}>
                        Change your password
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default PasswordChangeDialog;