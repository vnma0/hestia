import React from 'react'
import SubmissionTable from './submissionTable'

import submissionParse from './stub/submission.js'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    CircularProgress,
} from '@material-ui/core'

import Paginator from './paginationNavigator.js'

class Submissions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submissions: [],
            interval: undefined,

            rowsPerPage: 10,
            listSize: 0,
            page: 0,

            loading: false,
        }
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        submissionParse().then(data =>
            this.setState({
                submissions: data.submissions,
                rowsPerPage: data.meta.pageSize,
                listSize: data.meta.submissionsListSize,
                page: data.meta.currentPageId,
            })
        )
    }

    render() {
        return (
            <>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {this.state.loading ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <></>
                                )}
                            </TableCell>
                            <Paginator
                                colSpan={6}
                                rowsPerPageOptions={[5, 10, 20, 50]}
                                rowsPerPage={this.state.rowsPerPage}
                                count={this.state.listSize}
                                page={this.state.page}
                                onChangePage={(event, page) => {
                                    if (event !== null) {
                                        submissionParse(
                                            this.state.listSize,
                                            page,
                                            this.state.rowsPerPage
                                        ).then(data =>
                                            this.setState({
                                                submissions: data.submissions,
                                                rowsPerPage: data.meta.pageSize,
                                                listSize:
                                                    data.meta
                                                        .submissionsListSize,
                                                page: data.meta.currentPageId,
                                            })
                                        )
                                    }
                                }}
                                onChangeRowsPerPage={event => {
                                    console.log(event.target.value)
                                    // event.target.value is the key here
                                    this.setState({
                                        rowsPerPage: event.target.value,
                                    })
                                }}
                            />
                        </TableRow>
                    </TableHead>
                </Table>
                <SubmissionTable submissionList={this.state.submissions} />
            </>
        )
    }
}

export default Submissions
