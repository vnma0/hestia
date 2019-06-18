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

class ScoreboardError extends React.PureComponent {
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
                            t('scoreboard.lazyAssistant.failedLoadInfo.text', {
                                returnObjects: true
                            })[0]
                        }
                    </Typography>
                    <Typography component='p'>
                        {
                            t('scoreboard.lazyAssistant.failedLoadInfo.text', {
                                returnObjects: true
                            })[1]
                        }
                    </Typography>
                    <div style={{ marginTop: 20 }}>
                        <Button onClick={() => window.location.reload(true)} color='primary'>
                            {t('scoreboard.lazyAssistant.failedLoadInfo.control.reload')}
                        </Button>
                    </div>
                </div>
            );
    }
}

ScoreboardError = withNamespaces()(ScoreboardError);

export { LoadingIndicator, ScoreboardError };
