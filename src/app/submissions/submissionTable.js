import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    Paper,
    TableSortLabel,
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
            submissionList: this.props.submissionList,
            reverseSort: true,

            details: undefined,
            detailExtendedOpen: false,
        }
        // Yeah, in order to support sorting
        // and since props are immutable
        // we mirror them to this.state and mutate it instead

        // this.sortBy = this.sortBy.bind(this)

        // just keep the sorting implementation here
        // because for now it is pretty unneeded
    }

    // sortBy(field) {
    //         this.setState({
    //             submissionList: this.state.submissionList.sort((a, b) => {
    //                 let a1 = (field !== 'timestamp' ? a[field] : new Date(a['timestamp'])),
    //                     b1 = (field !== 'timestamp' ? b[field] : new Date(b['timestamp']))

    //                 if (a1 < b1) return -1
    //                 if (a1 > b1) return 1
    //                 return 0
    //             }),
	// 			reverseSort: !this.state.reverseSort
    //         })
    //     this.setState({
    //         submissionList: this.state.reverseSort
    //             ? this.state.submissionList.reverse()
    //             : this.state.submissionList,
    //     })
    //     this.forceUpdate()
    // }

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
                                <TableCell>
                                    <TableSortLabel
                                        direction={
                                            this.state.reverseSort
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        active={false}
                                        // onClick={() =>
                                        //     this.sortBy('contestant')
                                        // }
                                        hideSortIcon
                                    >
                                        Submitted by
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        direction={
                                            this.state.reverseSort
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        active={false} hideSortIcon
                                        // onClick={() => this.sortBy('problem')}
                                    >
                                        Problem
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        direction={
                                            this.state.reverseSort
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        active={false} hideSortIcon
                                        // onClick={() => this.sortBy('language')}
                                    >
                                        Programming language
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        direction={
                                            this.state.reverseSort
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        active={false} hideSortIcon
                                        // onClick={() => this.sortBy('verdict')}
                                    >
                                        Verdict
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        direction={
                                            this.state.reverseSort
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        active={false} hideSortIcon
                                        // onClick={() => this.sortBy('executionTime')}
                                    >
                                        Execution duration
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        direction={
                                            this.state.reverseSort
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        active={false} hideSortIcon
                                        // onClick={() => this.sortBy('memory')}
                                    >
                                        Memory consumed
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        direction={
                                            this.state.reverseSort
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        active={false} hideSortIcon
                                        // onClick={() => this.sortBy('timestamp')}
                                    >
                                        Timestamp
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.submissionList.map((submission, index) => {
                                return (
                                    <Submission
                                        {...submission} key={index}
                                        onClick={() =>
                                            this.setState({
                                                details: { ...submission },
                                                detailExtendedOpen: true,
                                            })
                                        }
                                    />
                                )
                            })}
                        </TableBody>
                    </Table>
                    {/* a global dialog to avoid re-rendering components */}
                    <DetailedSubmission
                        {...this.state.details}
                        open={
                            this.state.detailExtendedOpen && this.state.details
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
