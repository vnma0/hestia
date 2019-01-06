import React from 'react';

import { Drawer, CardContent, CardHeader, IconButton, Paper, Table, TableHead, TableCell, TableRow, TableBody, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import ResultTable from './testBasedVerdictTable.js';
import VerdictSignature from '../signature/verdictSignature';

/**
 * @name DetailedSubmission 
 * @desc Fully-detailed report for a submission. ALL PROPS ARE PASSED DOWN TO <Dialog />
 * @param (Same requirements as for a <Submission />)
 * @returns {React.Component} A <Dialog /> component
 */

class DetailedSubmission extends React.Component {
    render() {
        return (
            <Drawer anchor="right" {...this.props}>
                <Paper>
                    <CardHeader avatar={<AccountCircle />}
                        title={this.props.contestant}
                        subheader={'Submitted : ' + this.props.timestamp}
                        action={
                            <IconButton disabled>
                                <VerdictSignature verdict={this.props.verdict} reversed />
                            </IconButton>
                        } />
                </Paper>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableCell>Language</TableCell>
                            <TableCell>Problem</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{this.props.language}</TableCell>
                                <TableCell>{this.props.problem}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Divider />
                    <ResultTable tests={this.props.tests} />
                </CardContent>
            </Drawer>
        )
    }
}

export default DetailedSubmission;