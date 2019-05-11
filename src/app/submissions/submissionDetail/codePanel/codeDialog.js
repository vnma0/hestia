import React from 'react';
import { Dialog, Button, DialogActions } from '@material-ui/core';

import { withNamespaces } from 'react-i18next';

import CodePanel from './codePanel.js';

export let toggleCodeDialog;

class CodeDialog extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        toggleCodeDialog = this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { id, ext, t } = this.props;
        return (
            <Dialog open={this.state.open} onClose={this.toggle} scroll='body'>
                <CodePanel id={id} ext={ext} />
                <DialogActions>
                    <Button onClick={this.toggle}>{t('submissions.details.code.dialog.controls.close')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withNamespaces()(CodeDialog);
