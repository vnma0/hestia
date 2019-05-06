import React from 'react';
import { Button, LinearProgress, Toolbar, Typography, Paper } from '@material-ui/core';
import { withGlobalState } from 'react-globally';

import Scoreboard from './scoreboard.js';
import './scoreboard.css';

import score from './stub/score.js';
import publicParse from '../globalStatusBar/staticStub/public.js';
import { withSnackbar } from 'notistack';
import { withNamespaces } from 'react-i18next';

class ScoreboardWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            problems: [],

            updating: true,
            lastUpdate: new Date()
        };
        this.update = this.update.bind(this);

        publicParse().then(data => {
            this.setState({
                problems: data.problems,
                mode: data.mode
            });
        });
        this.update();
    }

    componentDidMount() {
        this.componentDidUpdate();
        publicParse().then(data => {
            this.setState({
                problems: data.problems,
                mode: data.mode
            });
        });
        this.update();
        this.resetUpdateInterval();
    }

    resetUpdateInterval = () => {
        clearInterval(this.interval);
        this.interval = setInterval(this.update, 30000);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        if (this.props.title) {
            document.title = String(this.props.title);
        }
    }

    update() {
        score()
            .then(data => {
                this.setState({
                    result: data,
                    updating: false,
                    lastUpdate: new Date()
                });
            })
            .catch(() => {
                const string = this.props.t('scoreboard.error.failTrans');
                this.props.enqueueSnackbar(string, { variant: 'error' });
                this.setState({ updating: false });
            });
    }

    render() {
        const { t } = this.props;
        return (
            <>
                <Paper square>
                    <Toolbar variant='dense'>
                        <Typography style={{ flexGrow: 1 }}>
                            {`${t('scoreboard.reload.lastUpdateTimestamp')} : `}
                            <span className='code-text'>{this.state.lastUpdate.toString()}</span>
                        </Typography>
                        <Button
                            variant='contained'
                            color='secondary'
                            disabled={this.state.updating}
                            onClick={() => {
                                this.setState({ updating: true });
                                this.update();
                                this.resetUpdateInterval();
                            }}>
                            {this.state.updating
                                ? t('scoreboard.reload.updating')
                                : t('scoreboard.reload.updateAction')}
                        </Button>
                    </Toolbar>
                </Paper>
                {this.state.updating && <LinearProgress />}
                <div
                    style={{
                        overflowX: 'auto'
                    }}>
                    <Scoreboard problems={this.state.problems} results={this.state.result} mode={this.state.mode} />
                </div>
            </>
        );
    }
}

export default withNamespaces()(withGlobalState(withSnackbar(ScoreboardWrapper)));
