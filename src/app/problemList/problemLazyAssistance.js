import React from 'react';
import { CircularProgress, Typography, Button } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';

function LoadingIndicator() {
    return (
        <div align='center' style={{ marginTop: '10%' }}>
            <CircularProgress />
        </div>
    );
}

class ProblemError extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { error: false };
    }

    // error boundary for ProblemWrapper
    static getDerivedStateFromError(error) {
        return { error: true };
    }

    render() {
        const { t } = this.props;
        if (!this.state.error)
            // if no error, render normally
            return this.props.children;
        else
            return (
                <div align='center' style={{ margin: '10%' }}>
                    <Typography variant='h6'>
                        {
                            t('problems.lazyAssistant.failedLoadInfo.text', {
                                returnObjects: true
                            })[0]
                        }
                    </Typography>
                    <Typography component='p'>
                        {
                            t('problems.lazyAssistant.failedLoadInfo.text', {
                                returnObjects: true
                            })[1]
                        }
                    </Typography>
                    <div style={{ marginTop: 20 }}>
                        <Button onClick={() => window.location.reload(true)} color='primary' variant='contained'>
                            {t('problems.lazyAssistant.failedLoadInfo.control.reload')}
                        </Button>
                    </div>
                </div>
            );
    }
}

ProblemError = withNamespaces()(ProblemError);

export { LoadingIndicator, ProblemError };
