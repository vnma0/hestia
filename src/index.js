import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './external/roboto/roboto.css';

import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, withGlobalState } from 'react-globally';
import { SnackbarProvider, withSnackbar } from 'notistack';

import LoggedOut from './app/loggedOut.js';
import Loading from './loading.js';
import GlobalStatusBar from './app/globalStatusBar/globalStatusBar.js';
import Sidenav from './app/sidenav/sidenav.js';
import Homepage from './app/home/homepage.js';
import Submission from './app/submissions/submissionLazyWrapper.js';
import ProblemWrapper from './app/problemList/problemWrapper.js';
import ScoreboardWrapper from './app/scoreboard/scoreboardLazyWrapper';

import SubmissionLauncher from './app/submissions/submissionLauncher.js';
import ProblemLauncher from './app/problemList/problemLauncher.js';
import ScoreboardLauncher from './app/scoreboard/scoreboardLauncher.js';
import HomepageLauncher from './app/home/homepageLauncher.js';

import verifyLogin from './app/globalStatusBar/login/stub/credential.js';
import publicParse from './app/globalStatusBar/staticStub/public.js';
import { toggleSidenav } from './app/sidenav/sidenav.js';
import { slideIn } from './app/globalStatusBar/lib/libTransition.js';

import i18n from './i18n.js';
import { withNamespaces } from 'react-i18next';
import './version.js';

const globalState = {
    language: localStorage.getItem('language') || 'en_US',
    username: null
};

class Hestia extends React.Component {
    constructor(props) {
        console.log('Hestia : Global node has been successfully loaded!');
        super(props);
        this.state = {
            loading: true,
            loadingMessage: '',
            user: {
                loggedIn: false,
                username: '',
                id: '',
                isAdmin: false
            },

            contestName: '',
            contestTime: {
                start: new Date(),
                end: new Date()
            }
        };
        i18n.changeLanguage(this.props.globalState.language);
    }

    async componentWillMount() {
        const { t } = this.props;
        this.setState({
            loadingMessage: t('global.loading.public')
        });
        await publicParse()
            .catch(() => {
                this.props.enqueueSnackbar(this.props.t('globalStatusBar.staticLoader.failed'));
                return {
                    name: '<error>',
                    time: {
                        start: new Date(),
                        end: new Date()
                    },
                    problems: [],
                    ext: ['null'],
                    mode: 'OI',
                    errorLoading: true
                };
            })
            .then(({ name, time, errorLoading }) => {
                if (errorLoading)
                    this.setState({
                        loadingMessage: `${t('global.loading.public')}${t('global.loading.failSuffix')}`
                    });
                this.setState({
                    contestName: name,
                    contestTime: time
                });
            });
        await new Promise(resolve => setTimeout(resolve, 100));
        this.setState({
            loadingMessage: t('global.loading.verifyCredential')
        });
        await verifyLogin()
            .catch(() => {
                return {
                    ok: false,
                    username: null,
                    id: null,
                    isAdmin: false,
                    errorLoading: true
                };
            })
            .then(({ ok, username, id, isAdmin, errorLoading }) => {
                if (errorLoading)
                    this.setState({
                        loadingMessage: `${t('global.loading.verifyCredential')}${t('global.loading.failSuffix')}`
                    });
                this.setState({
                    user: {
                        loggedIn: ok,
                        username: username,
                        id: id,
                        isAdmin: isAdmin
                    }
                });
                this.props.setGlobalState({
                    username: username
                });
            });
        await new Promise(resolve => setTimeout(resolve, 100));
        this.setState({
            loadingMessage: `${t('global.loading.done')}`
        });
        setTimeout(() => this.setState({ loading: false }), 200);
    }

    render() {
        const { t } = this.props;
        const { user, contestName, contestTime, loading } = this.state;
        if (loading) {
            let { loadingMessage } = this.state;
            return <Loading>{loadingMessage}</Loading>;
        } else
            return (
                <Router>
                    <>
                        <GlobalStatusBar
                            currentUser={user.username}
                            currentUserId={user.id}
                            loggedIn={user.loggedIn}
                            contestName={contestName}
                            contestTime={contestTime}
                            menuOpen={toggleSidenav}
                            isAdmin={user.isAdmin}
                        />
                        <div style={{ display: this.state.user.loggedIn ? 'block' : 'none' }}>
                            <div>
                                <Sidenav>
                                    {[
                                        {
                                            page: <HomepageLauncher button onClick={toggleSidenav} />,
                                            link: '/'
                                        },
                                        {
                                            page: <SubmissionLauncher button onClick={toggleSidenav} />,
                                            link: '/submissions'
                                        },
                                        {
                                            page: <ProblemLauncher button onClick={toggleSidenav} />,
                                            link: '/problems'
                                        },
                                        {
                                            page: <ScoreboardLauncher button onClick={toggleSidenav} />,
                                            link: '/scoreboard'
                                        }
                                    ]}
                                </Sidenav>
                                <Route
                                    path='/'
                                    render={() => {
                                        document.title = this.state.contestName;
                                        return <Homepage title={this.state.contestName} />;
                                    }}
                                />
                                <Route
                                    path='/submissions'
                                    render={() => (
                                        <Submission
                                            title={`${this.state.contestName} - ${t('submissions.launcher')}`}
                                        />
                                    )}
                                />
                                <Route
                                    path='/problems'
                                    render={() => (
                                        <ProblemWrapper
                                            title={`${this.state.contestName} - ${t('problems.launcher')}`}
                                        />
                                    )}
                                />
                                <Route
                                    path='/scoreboard'
                                    render={() => (
                                        <ScoreboardWrapper
                                            title={`${this.state.contestName} - ${t('scoreboard.launcher')}`}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div style={{ display: this.state.user.loggedIn ? 'none' : 'block' }}>
                            {!this.state.user.loggedIn && <LoggedOut />}
                        </div>
                    </>
                </Router>
            );
    }
}

var HestiaGlobal = withNamespaces()(withSnackbar(withGlobalState(Hestia)));

ReactDOM.render(
    <SnackbarProvider
        maxSnack={2}
        autoHideDuration={1500}
        TransitionComponent={props => slideIn(props, 'left')}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}>
        <Provider globalState={globalState}>
            <CssBaseline />
            <HestiaGlobal />
        </Provider>
    </SnackbarProvider>,
    document.querySelector('#root')
);
