import React, {Component} from 'react';

import { DialogTitle, DialogContent, Dialog, DialogActions, AppBar, Tabs, Tab } from '@material-ui/core';
import { Button, Slide } from '@material-ui/core';

/**
 * @name UserSettingDialog
 * @description Dialog to change user settings.
 *              ALL PROPS WILL BE PASSED DOWN TO <Dialog />
 * @param {String} user Username
 * @param {String} slideDirection : direction that the dialog slides in.
 * @returns {<Dialog />} A '@material-ui/core/Dialog' component
 * @author minhducsun2002
 */

class UserSettingDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab : 0
        }
        this.slideIn = this.slideIn.bind(this);
    }

    slideIn(props) {
        return <Slide direction={this.props.slideDirection || 'up'} {...props} />;
        // by default the dialog slides upwards
    }   

    handleChange(event, value) {
        this.setState({
            currentTab : value
        })
    }

    render() {
        return (
            <Dialog {...this.props} TransitionComponent={this.slideIn}>
                <DialogTitle>
                    User settings {this.props.user ? `for ${this.props.user}` : ''}
                </DialogTitle>
                <DialogContent>
                    <AppBar position="static">
                        <Tabs value={this.state.currentTab} fullWidth>
                            <Tab label="Password" />
                        </Tabs>
                    </AppBar>
                    {this.state.currentTab === 0 && <></>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.submitOptions}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default UserSettingDialog;