import React from 'react';
import { Dialog, DialogActions, Button } from '@material-ui/core';

import ResultTable from './testBasedVerdictTable.js';
import CodeDialog from './codePanel/codeDialog.js';

import { toggleCodeDialog } from './codePanel/codeDialog.js';
import { withNamespaces } from 'react-i18next';

export let toggleDetails;
export let addDetails;

/**
 * @name SubmissionDetails
 * @param {String} id : ID of the submission, used to get back source code
 * @param {} tests : pass the `tests` component as defined in `submissionTable.js`
 */

class SubmissionDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            details: {}
        };
        toggleDetails = this.toggle = this.toggle.bind(this);
        addDetails = this.addDetails = this.addDetails.bind(this);
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    addDetails(details) {
        this.setState({
            details: details
        });
    }

    render() {
        const { t } = this.props;
        const { details, open } = this.state;
        return (
            <>
                <Dialog open={open} onClose={this.toggle} maxWidth='md' scroll='body'>
                    <ResultTable tests={details.tests} score={details.score} />
                    <DialogActions>
                        <Button onClick={toggleCodeDialog}>{t('submissions.details.control.showSource')}</Button>
                        <Button onClick={this.toggle}>{t('submissions.details.control.close')}</Button>
                    </DialogActions>
                </Dialog>
                <CodeDialog
                    id={details.id}
                    ext={String(details.language)
                        .replace('.', '')
                        .toLowerCase()}
                />
            </>
        );
    }
}

export default withNamespaces()(SubmissionDetails);
