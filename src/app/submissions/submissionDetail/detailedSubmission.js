import React from 'react'

import {
    Drawer,
    CardContent,
    CardHeader,
    IconButton,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Divider,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'

import ResultTable from './testBasedVerdictTable.js'
import VerdictSignature from '../signature/verdictSignature'
import { isUndefined } from 'util';

/**
 * @name DetailedSubmission
 * @desc Fully-detailed report for a submission. ALL PROPS ARE PASSED DOWN TO `<Dialog />`
 * @param (Same requirements as for a `<Submission />`)
 * @returns {React.Component} A `<Dialog />` component
 */

export let toggleDetailedSubmission;

class DetailedSubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            details: {}
        }

        toggleDetailedSubmission = this.toggle = this.toggle.bind(this);
    }

    toggle(props) {
        let openable = !isUndefined(props.contestant) 
            && !isUndefined(props.timestamp)
            && !isUndefined(props.verdict)
        this.setState({
            open: !this.state.open && openable,
            details: props
        })
    }

    render() {
        return (
            <Drawer
                anchor="right"
                {...this.props}
                open={this.state.open}
                onClose={this.toggle}
                PaperProps={{
                    style: { margin: 0, overflowX: 'hidden' },
                }}>
                <Paper>
                    <CardHeader
                        avatar={<AccountCircle />}
                        title={this.state.details.contestant}
                        subheader={'Submitted : ' + this.state.details.timestamp}
                        action={
                            <>
                                <IconButton
                                    disabled
                                    style={{
                                        marginTop: 10,
                                        marginRight: 0,
                                        paddingRight: 0,
                                    }}>
                                    <VerdictSignature
                                        verdict={this.state.details.verdict}
                                        reversed iconOnly
                                    />
                                </IconButton>
                                <IconButton onClick={this.toggle}>
                                    <ExitToApp />
                                </IconButton>
                            </>
                        }
                    />
                </Paper>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Language</TableCell>
                                <TableCell>Problem</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {this.state.details.language || 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {this.state.details.problem || 'N/A'}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Divider />
                    <ResultTable tests={this.state.details.tests} />
                </CardContent>
            </Drawer>
        )
    }
}

export default DetailedSubmission
