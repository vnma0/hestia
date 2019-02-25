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
        }
        this.update = this.update.bind(this)
    }

    update = (listSize, page, rowsPerPage) => {
        submissionParse(listSize, page, rowsPerPage).then(data =>
            this.setState({
                submissions: data.submissions,
                rowsPerPage: data.meta.pageSize,
                listSize: data.meta.submissionsListSize,
                page: data.meta.currentPageId,
            })
        )
    }

    componentDidMount() {
        this.update(
            this.state.listSize,
            this.state.page,
            this.state.rowsPerPage
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
                                        this.update(
                                            this.state.listSize,
                                            page,
                                            this.state.rowsPerPage
                                        )
                                    }
                                }}
                                onChangeRowsPerPage={event => {
                                    console.log(event.target.value)
                                    // event.target.value is the key here
                                    this.update(
                                        this.state.listSize,
                                        this.state.page,
                                        event.target.value
                                    )
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
