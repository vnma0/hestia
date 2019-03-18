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
import DetailedSubmission from './submissionDetail/detailedSubmission'

/**
 * @name SubmissionTable
 * @param `{Array : Object({contestant, Problem, Language, Verdict, ExecutionTime, memory, timestamp, test})}` `SubmissionList`
 * 					- An array containing objects satisfying this schema :
 * 					`{contestant, Problem, Language, Verdict, ExecutionTime, memory, timestamp, test}`
 * 					- All props are strings,
 * 					except `tests` which is an `{Array : Object ({verdict, executionTime, memory, mark})}`
 * @return {Table} : a `<Table />` containing submissions
 */

import { toggleDetailedSubmission } from './submissionDetail/detailedSubmission';

class SubmissionTable extends React.Component {
    render() {
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
                        <TableBody>
                            {this.props.submissionList.map(submission => {
                                return (
                                    <Submission
                                        {...submission}
                                        key={submission.id}
                                        onClick={() => toggleDetailedSubmission(submission)}
                                    />
                                )
                            })}
                        </TableBody>
                    </Table>
                    {/* a global dialog to avoid re-rendering components */}
                    <DetailedSubmission />
                </Paper>
            </>
        )
    }
}

export default SubmissionTable
