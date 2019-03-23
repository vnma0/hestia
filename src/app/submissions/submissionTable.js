import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    Paper,
    TableRow,
} from '@material-ui/core'

import Submission from './submission.js'
import SubmissionDetail from './submissionDetail/submissionDetail.js'
/**
 * @name SubmissionTable
 * @param `{Array : Object({contestant, Problem, Language, Verdict, ExecutionTime, memory, timestamp, test})}` `SubmissionList`
 * 					- An array containing objects satisfying this schema :
 * 					`{contestant, Problem, Language, Verdict, ExecutionTime, memory, timestamp, test}`
 * 					- All props are strings,
 * 					except `tests` which is an `{Array : Object ({verdict : String, executionTime : String, memory : String, mark : String})}`
 * @return {Table} : a `<Table />` containing submissions
 */

import {
    toggleDetails,
    addDetails,
} from './submissionDetail/submissionDetail.js'

class SubmissionTable extends React.PureComponent {
    render() {
        let mapping = this.props.submissionList.map(submission => (
            <Submission
                {...submission}
                key={submission.id}
                onClick={() => {
                    addDetails({ tests: submission.tests, id: submission.id })
                    toggleDetails()
                }}
            />
        ))
        return (
            <>
                <Paper>
                    <Table style={{ tableLayout: 'fixed' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Submitted by</TableCell>
                                <TableCell>Problem</TableCell>
                                <TableCell>Programming language</TableCell>
                                <TableCell>Verdict</TableCell>
                                <TableCell>Execution duration</TableCell>
                                <TableCell>Memory consumed</TableCell>
                                <TableCell>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{mapping}</TableBody>
                    </Table>
                    <SubmissionDetail />
                </Paper>
            </>
        )
    }
}

export default SubmissionTable
