import React from 'react'
import SubmissionTable from './submissionTable'

import submissionParse from './stub/submission.js'
import { Table, TableHead, TableRow } from '@material-ui/core'

import Paginator from './paginationNavigator.js'

class Submissions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submissions: [],

            rowsPerPage: 10,
            listSize: 0,
            page: 0,
        }
        this.update = this.update.bind(this)
        this.update(
            this.state.listSize,
            this.state.page,
            this.state.rowsPerPage
        )
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

    render() {
        return (
            <>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Paginator
                                colSpan={6}
                                rowsPerPage={this.state.rowsPerPage}
                                count={this.state.listSize}
                                page={this.state.page}
                                onChangePage={(event, page) => {
                                    this.update(
                                        this.state.listSize,
                                        page,
                                        this.state.rowsPerPage
                                    )
                                }}
                                onChangeRowsPerPage={event => {
                                    const current =
                                        this.state.rowsPerPage * this.state.page
                                    const newPage = Math.floor(
                                        current / Number(event.target.value)
                                    )
                                    // event.target.value is the key here
                                    this.update(
                                        this.state.listSize,
                                        newPage,
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
