import React from 'react'
import SubmissionTable from './submissionTable'

import submissionParse from './stub/submission.js'

class Submissions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submissions: [],
            interval: undefined,
        }
        this.update = this.update.bind(this)

        window.hestia.updateSubmission = this.update
    }

    update = () => {
        submissionParse(() => {
            this.setState({
                submissions: window.hestia.submissions
            })
        })
    }

    componentDidMount() {
        submissionParse(() => {
            this.setState({
                interval: setInterval(this.update, 5000),
                submissions: window.hestia.submissions
            })
        })
    }

    componentWillUnmount() {
        submissionParse(() => {
            clearInterval(this.state.interval)
        })
    }

    render() {
        return <SubmissionTable submissionList={this.state.submissions} />
    }
}

export default Submissions
