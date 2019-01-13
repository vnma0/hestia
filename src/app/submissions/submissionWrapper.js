import React from 'react';
import SubmissionTable from './submissionTable';

import submissionParse from './stub/submission.js'

class Submissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submissions : [],
            interval : undefined
        }
        this.update = this.update.bind(this);

        window.hestia.updateSubmission = this.update
    }

    update = () => {
        this.setState({
            submissions: window.hestia.submissions
        });
        this.forceUpdate()
    }

    componentDidMount() {
        submissionParse(() => {
                clearInterval(this.state.interval);
                this.setState({
                    interval : setInterval(this.update, 30000)
                });
                this.update()
        })
    }

    componentWillUnmount() {
        submissionParse(() => {
                clearInterval(this.state.interval);
                this.setState({
                    interval : setInterval(this.update, 1000 * 60 * 5)
                });
                this.update()
        })
    }

    render() {
        return  <SubmissionTable submissionList={window.hestia.submissions} />
    }
}

export default Submissions;