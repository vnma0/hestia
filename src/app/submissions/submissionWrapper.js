import React from 'react'
import SubmissionTable from './submissionTable'

import submissionParse from './stub/submission.js'
import { Table, TableHead, TableRow, TableCell, CircularProgress } from '@material-ui/core';

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

            loading: false
        }
        this.update = this.update.bind(this)

        window.hestia.updateSubmission = this.update
    }

    update = () => {
        this.setState({
            loading : true
        })
        submissionParse(this.state.listSize, this.state.page, this.state.rowsPerPage)
            .then(() => this.setState({
                submissions: window.hestia.submissions,
                rowsPerPage : window.hestia.meta.pageSize,
                listSize: window.hestia.meta.submissionsListSize,
                page : window.hestia.meta.currentPageId,
                loading: false
            }))
    }

    componentDidMount() {
        this.setState({
            loading : true
        })
        submissionParse(this.state.listSize, this.state.page, this.state.rowsPerPage)
            .then(() => this.setState({
                interval : setInterval(this.update, 5000),
                submissions: window.hestia.submissions,
                rowsPerPage : window.hestia.meta.pageSize,
                listSize: window.hestia.meta.submissionsListSize,
                page : window.hestia.meta.currentPageId,
                loading: false
            }))
    }

    componentWillUpdate() {

    }

    componentWillUnmount() {
        submissionParse(this.state.listSize, this.state.page, this.state.rowsPerPage)
            .then(() => {
                clearInterval(this.state.interval)
            })
    }

    render() {
        return (
            <>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {this.state.loading ? <CircularProgress size={20}/> : <></>}
                            </TableCell>
                            <Paginator colSpan={6}
                                rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
                                rowsPerPage={this.state.rowsPerPage} count={this.state.listSize}
                                page={this.state.page}
                                onChangePage={(event, page) => {
                                    if (event !== null)
                                        this.setState({
                                            page: page
                                        })
                                }} onChangeRowsPerPage={(event) => {
                                    // console.log(event.target.value)
                                    // event.target.value is the key here
                                    this.setState({
                                        rowsPerPage: event.target.value
                                    })
                                }}/>
                        </TableRow>
                    </TableHead>
                </Table>
                <SubmissionTable submissionList={this.state.submissions} />
            </>
        )
    }
}

export default Submissions
