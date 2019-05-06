import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './external/roboto/roboto.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, withGlobalState } from 'react-globally';
import { SnackbarProvider, withSnackbar } from 'notistack';

import { translations } from './strings/hestia-l10n/l10n-loader.js';

import LoggedOut from './app/loggedOut.js';
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

import i18n from './i18n.js';
import { withNamespaces } from 'react-i18next';

const globalState = {
    language: localStorage.getItem('language') || 'en_US'
};

class Hestia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'front',
            user: {
                loggedIn: false,
                username: '',
                id: ''
            },

            contestName: '',
            contestTime: {
                start: new Date(),
                end: new Date()
            }
        };
        i18n.changeLanguage(this.props.globalState.language);
    }

    componentWillMount() {
        publicParse()
            .catch(() => {
                this.props.enqueueSnackbar(
                    translations[this.props.globalState.language].translation.globalStatusBar.staticLoader.failed
                );
                return {
                    name: '',
                    time: {
                        start: new Date(),
                        end: new Date()
                    },
                    problems: [],
                    ext: ['null'],
                    mode: 'OI'
                };
            })
            .then(data => {
                this.setState({
                    contestName: data.name,
                    contestTime: data.time
                });
            });
        verifyLogin().then(data => {
            this.setState({
                user: {
                    loggedIn: data.ok,
                    username: data.username,
                    id: data.id
                }
            });
        });
    }

    render() {
        const { t } = this.props;
        return (
            <>
                <GlobalStatusBar
                    currentUser={this.state.user.username}
                    currentUserId={this.state.user.id}
                    loggedIn={this.state.user.loggedIn}
                    contestName={this.state.contestName}
                    contestTime={this.state.contestTime}
                    menuOpen={toggleSidenav}
                />
                <div style={{ display: this.state.user.loggedIn ? 'block' : 'none' }}>
                    <Router>
                        <div>
                            <Sidenav
                                pages={[
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
                            />
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
                                    <Submission title={`${this.state.contestName} - ${t('submissions.launcher')}`} />
                                )}
                            />
                            <Route
                                path='/problems'
                                render={() => (
                                    <ProblemWrapper title={`${this.state.contestName} - ${t('problems.launcher')}`} />
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
                    </Router>
                </div>
                <div style={{ display: this.state.user.loggedIn ? 'none' : 'block' }}>
                    {!this.state.user.loggedIn && <LoggedOut />}
                </div>
            </>
        );
    }
}

var HestiaGlobal = withNamespaces()(withSnackbar(withGlobalState(Hestia)));

ReactDOM.render(
    <SnackbarProvider maxSnack={4}>
        <Provider globalState={globalState}>
            <HestiaGlobal />
        </Provider>
    </SnackbarProvider>,
    document.querySelector('#root')
);
