import React from "react";
import { Dialog, DialogActions, Button } from "@material-ui/core";
import LocalizedMessage from 'react-l10n';

import ResultTable from "./testBasedVerdictTable.js";
import CodeDialog from "./codePanel/codeDialog.js";

import { toggleCodeDialog } from "./codePanel/codeDialog.js";

export let toggleDetails;
export let addDetails;

/**
 * @name SubmissionDetails
 * @param {String} id : ID of the submission, used to get back source code
 * @param {} tests : pass the `tests` component as defined in `submissionTable.js`
 */

export default class SubmissionDetails extends React.PureComponent {
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
        return (
            <>
                <Dialog
                    open={this.state.open}
                    onClose={this.toggle}
                    maxWidth="md"
                    fullWidth
                    scroll="body">
                    <ResultTable tests={this.state.details.tests} />
                    <DialogActions>
                        <Button onClick={toggleCodeDialog}>
                            <LocalizedMessage id="submissions.details.control.showSource" />
                        </Button>
                        <Button onClick={this.toggle}>
                            <LocalizedMessage id="submissions.details.control.close" />
                        </Button>
                    </DialogActions>
                </Dialog>
                <CodeDialog id={this.state.details.id} />
            </>
        );
    }
}
