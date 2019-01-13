import React from 'react';
import SubmissionTable from './submissionTable';

import submissionParse from './stub/submission.js'

class Submissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submissions : []
        }
    }

    componentDidMount() {
        submissionParse(() => {
            this.setState({
                submissions: window.hestia.submissions
            });
            this.forceUpdate()
        })
    }

    render() {
        return  <SubmissionTable submissionList={window.hestia.submissions} />
    }
}

export default Submissions;