import React from 'react';
import { Dialog, DialogActions, Button, Grid } from '@material-ui/core';

import ResultTable from './testBasedVerdictTable.js'
import CodePanel from './codePanel.js';

export let toggleDetails;
export let addDetails;

export default class SubmissionDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            details: {}
        }
        toggleDetails = this.toggle = this.toggle.bind(this);
        addDetails = this.addDetails = this.addDetails.bind(this);
    }

    toggle() {
        this.setState({
            open : !this.state.open
        })
    }

    addDetails(details) {
        this.setState({
            details : details
        })
    }

    render() {
        return (
            <Dialog open={this.state.open} onClose={this.toggle} maxWidth="md"
                fullWidth scroll="body" >
                <Grid container>
                    <Grid item>
                        <ResultTable tests={this.state.details.tests}/>
                    </Grid>
                    <Grid item>
                        <CodePanel id={this.state.details.id}/>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button onClick={this.toggle}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}