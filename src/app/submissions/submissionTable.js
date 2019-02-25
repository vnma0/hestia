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

// example here
/*
	<SubmissionTable submissionList={[{
		contestant : 'minhducsun123456', problem : 'A',
		verdict : 'Accepted', executionTime: '00:00:123', memory : '1TB', timestamp: '00:00:00',
		language : 'Perl', tests : [
			{verdict : 'AC', executionTime : '1000h', memory : '1TB', mark : '30'},
			{verdict : 'AC', executionTime : '1000d', memory : '1MB', mark : '50'},
			{verdict : 'AC', executionTime : '0.1s', memory : '5TB', mark : '300'}
		]
	},{
		contestant : 'minhducsun2002', problem : 'A',
		verdict : 'Wrong output', executionTime: '11:00:234', memory : '1TB', timestamp: '00:00:00',
		language : 'Pascal',
	},{
		contestant : 'minhducsun123456', problem : 'A',
		verdict : 'Accepted', executionTime: '38:46:115', memory : '1TB', timestamp: '00:00:00',
		language : 'C99', tests : [
			{verdict : 'AC', executionTime : '5s', memory : '10TB', mark : '30'}
		]
	}]}/>
*/

class SubmissionTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reverseSort: true,

            details: undefined,
            detailExtendedOpen: false,
        }
    }

    render() {
        return (
            <>
                <Paper>
                    <Table
                        style={{
                            tableLayout: 'fixed',
                        }}
                    >
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
                            {this.props.submissionList.map(
                                (submission, index) => {
                                    return (
                                        <Submission
                                            {...submission}
                                            key={index}
                                            onClick={() =>
                                                this.setState({
                                                    details: { ...submission },
                                                    detailExtendedOpen: true,
                                                })
                                            }
                                        />
                                    )
                                }
                            )}
                        </TableBody>
                    </Table>
                    {/* a global dialog to avoid re-rendering components */}
                    <DetailedSubmission
                        {...this.state.details}
                        open={
                            this.state.detailExtendedOpen &&
                            Boolean(this.state.details)
                        }
                        onClose={() =>
                            this.setState({
                                detailExtendedOpen: false,
                            })
                        }
                    />
                </Paper>
            </>
        )
    }
}

export default SubmissionTable
