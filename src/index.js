import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './external/roboto/roboto.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LocalizationProvider } from 'react-l10n';
import { Provider, withGlobalState } from 'react-globally';

import { translations } from './strings/hestia-l10n/l10n-loader.js';

import GlobalStatusBar from './app/globalStatusBar/globalStatusBar.js';
import Sidenav from './app/sidenav/sidenav.js';
import Homepage from './app/home/homepage.js';
import Submission from './app/submissions/submissionLazyWrapper.js';
import ProblemWrapper from './app/problemList/problemWrapper.js';
import ScoreboardWrapper from './app/scoreboard/scoreboardLazyWrapper';
import Notify from './app/notifier/notify.js';
import { slideIn } from './app/globalStatusBar/lib/libTransition.js';

import SubmissionLauncher from './app/submissions/submissionLauncher.js';
import ProblemLauncher from './app/problemList/problemLauncher.js';
import ScoreboardLauncher from './app/scoreboard/scoreboardLauncher.js';
import HomepageLauncher from './app/home/homepageLauncher.js';

import verifyLogin from './app/globalStatusBar/login/stub/credential.js';
import publicParse from './app/globalStatusBar/staticStub/public.js';
import { toggleSidenav } from './app/sidenav/sidenav.js';

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
    }

    componentWillMount() {
        publicParse().then(data => {
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
        let language = this.props.globalState.language;
        let strings =
            language && translations[language]
                ? { resources: translations[language].resources }
                : { resources: translations['en_US'].resources };
        return (
            <LocalizationProvider {...strings}>
                <Notify
                    autoHideDuration={3000}
                    TransitionComponent={props => slideIn(props, 'left')}
                    transitionDuration={{
                        enter: 100,
                        exit: 100
                    }}
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom'
                    }}
                />
                <GlobalStatusBar
                    currentUser={this.state.user.username}
                    currentUserId={this.state.user.id}
                    loggedIn={this.state.user.loggedIn}
                    contestName={this.state.contestName}
                    contestTime={this.state.contestTime}
                    menuOpen={toggleSidenav}
                />
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
                                <Submission
                                    title={`${this.state.contestName} - ${strings.resources.submissions.launcher}`}
                                />
                            )}
                        />
                        <Route
                            path='/problems'
                            render={() => (
                                <ProblemWrapper
                                    title={`${this.state.contestName} - ${strings.resources.problems.launcher}`}
                                />
                            )}
                        />
                        <Route
                            path='/scoreboard'
                            render={() => (
                                <ScoreboardWrapper
                                    title={`${this.state.contestName} - ${strings.resources.scoreboard.launcher}`}
                                />
                            )}
                        />
                    </div>
                </Router>
            </LocalizationProvider>
        );
    }
}

var HestiaGlobal = withGlobalState(Hestia);

ReactDOM.render(
    <Provider globalState={globalState}>
        <HestiaGlobal />
    </Provider>,
    document.querySelector('#root')
);
