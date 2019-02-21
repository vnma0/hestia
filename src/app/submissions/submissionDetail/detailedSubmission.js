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

/**
 * @name DetailedSubmission
 * @desc Fully-detailed report for a submission. ALL PROPS ARE PASSED DOWN TO `<Dialog />`
 * @param (Same requirements as for a `<Submission />`)
 * @returns {React.Component} A `<Dialog />` component
 */

class DetailedSubmission extends React.Component {
    render() {
        return (
            <Drawer
                anchor="right"
                {...this.props}
                PaperProps={{
                    style: { margin: 0, overflowX: 'hidden' },
                }}
            >
                <Paper>
                    <CardHeader
                        avatar={<AccountCircle />}
                        title={this.props.contestant}
                        subheader={'Submitted : ' + this.props.timestamp}
                        action={
                            <>
                                <IconButton
                                    disabled
                                    style={{
                                        marginTop: 10,
                                        marginRight: 0,
                                        paddingRight: 0,
                                    }}
                                >
                                    <VerdictSignature
                                        verdict={this.props.verdict}
                                        reversed iconOnly
                                    />
                                </IconButton>
                                <IconButton onClick={this.props.onClose}>
                                    <ExitToApp />
                                </IconButton>
                            </>
                        }
                    />
                </Paper>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableCell>Language</TableCell>
                            <TableCell>Problem</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {this.props.language || 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {this.props.problem || 'N/A'}
                                </TableCell>
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

export default DetailedSubmission
