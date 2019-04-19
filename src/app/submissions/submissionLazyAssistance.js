import React from 'react';
import { CircularProgress, Typography, Button } from '@material-ui/core';

import LocalizedMessage from 'react-l10n'

function LoadingIndicator () {
    return (
        <div align="center" style={{ marginTop: '10%' }}>
            <CircularProgress />
        </div>
    )
}

class SubmissionError extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { error: false }
    }

    // error boundary for ProblemWrapper
    static getDerivedStateFromError(error) {
        return { error: true };
    }

    render() {
        if (!this.state.error)
            // if no error, render normally
            return this.props.children;
        else
        return (
            <div
                align="center"
                style={{ margin: '10%' }}>
                <Typography variant="h6">
                    <LocalizedMessage id="submissions.lazyAssistant.failedLoadInfo.text[0]"/>
                </Typography>
                <Typography variant="p">
                    <LocalizedMessage id="submissions.lazyAssistant.failedLoadInfo.text[1]"/>
                </Typography>
                <div style={{ marginTop: 20 }}>
                    <Button
                        onClick={() => window.location.reload(true)}
                        color="primary" variant="raised">
                        <LocalizedMessage id="submissions.lazyAssistant.failedLoadInfo.control.reload"/>
                    </Button>
                </div>
            </div>
        )
    }
}

export { LoadingIndicator, SubmissionError };