import React, {Component} from 'react';

import { DialogTitle, DialogContent, Dialog, DialogActions } from '@material-ui/core';
import { Slide, Button, TextField } from '@material-ui/core'

/**
 * @name PasswordChangeForm
 * @param {boolean} open : the visibility of the dialog
 * @param {function} onClose : the function called when the dialog closes.
 * @param {String} slideDirection : direction that the dialog slides in.
 * @param {String} user : user name to display
 * @example <LoginDialog open={this.state.open} closeer={() => {this.state.open = false}} 
 *           slideDirection={'up'} />
 * 
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

        this.slideIn = this.slideIn.bind(this);
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

    slideIn(props) {
        return <Slide direction={this.props.slideDirection || 'up'} {...props} />;
        // by default the dialog slides upwards
    }

    render() {
        return (
            <Dialog open={this.props.open} TransitionComponent={this.slideIn}>
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