import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    TableCell,
    LinearProgress,
    Tooltip
} from '@material-ui/core';
import LocalizedMessage from 'react-l10n';

import SubmissionTable from './submissionTable.js';

import submissionParse from './stub/submission.js';

class Submissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submissions: [],

            rowsPerPage: 10,
            listSize: 0,
            page: 0
        };
        this.interval = undefined;
        this.staleUpdate = false;
        this.updateInProgress = false;

        this.update = this.update.bind(this);
        this.update(this.state.listSize, this.state.page, this.state.rowsPerPage);

        this.triggerUpdate = this.triggerUpdate.bind(this);
    }

    componentWillUpdate() {
        if (this.props.title) document.title = String(this.props.title);
    }

    update = (listSize, page, rowsPerPage) => {
        submissionParse(listSize, page, rowsPerPage).then(data =>
            this.setState({
                submissions: data.submissions,
                rowsPerPage: data.meta.pageSize,
                listSize: data.meta.submissionsListSize,
                page: data.meta.currentPageId
            })
        );
    };

    triggerUpdate() {
        this.staleUpdate = !this.staleUpdate;
        this.forceUpdate();
    }

    componentDidMount() {
        this.componentWillUpdate();
        this.interval = setInterval(() => {
            submissionParse(0, 0, 1).then(data => {
                if (data.meta.submissionsListSize > this.state.listSize) this.triggerUpdate();
            });
        }, 5 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Tooltip title={<LocalizedMessage id='submissions.control.reloadButton.tooltip' />}>
                                    <Button
                                        disabled={!this.staleUpdate || this.updateInProgress}
                                        onClick={() => {
                                            this.updateInProgress = true;
                                            this.forceUpdate();
                                            // currently updating, disable things

                                            this.update(0, 0, this.state.rowsPerPage);
                                            // done, applying changes & enabling things
                                            this.updateInProgress = false;
                                            this.triggerUpdate();
                                        }}>
                                        {this.updateInProgress ? (
                                            <LocalizedMessage id='submissions.control.reloadButton.reloading' />
                                        ) : (
                                            <LocalizedMessage id='submissions.control.reloadButton.reload' />
                                        )}
                                    </Button>
                                </Tooltip>
                            </TableCell>
                            <TablePagination
                                colSpan={5}
                                rowsPerPage={this.state.rowsPerPage}
                                count={this.state.listSize}
                                page={this.state.page}
                                onChangePage={(event, page) => {
                                    this.update(this.state.listSize, page, this.state.rowsPerPage);
                                }}
                                onChangeRowsPerPage={event => {
                                    const current = this.state.rowsPerPage * this.state.page;
                                    const newPage = Math.floor(current / Number(event.target.value));
                                    // event.target.value is the key here
                                    this.update(this.state.listSize, newPage, event.target.value);
                                }}
                                labelRowsPerPage={<LocalizedMessage id='submissions.control.rowsPerPageChange' />}
                                labelDisplayedRows={args => (
                                    <LocalizedMessage id='submissions.control.indexOfTotal' {...args} />
                                )}
                            />
                        </TableRow>
                    </TableHead>
                </Table>
                <LinearProgress
                    style={{
                        color: 'green',
                        display: this.updateInProgress ? '' : 'none'
                    }}
                />
                <div style={this.updateInProgress ? { opacity: 0.4, pointerEvents: 'none' } : {}}>
                    <SubmissionTable submissionList={this.state.submissions} />
                </div>
            </>
        );
    }
}

export default Submissions;
