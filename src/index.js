import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'typeface-roboto'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import GlobalStatusBar from './app/globalStatusBar/globalStatusBar.js'
import Sidenav from './app/sidenav/sidenav.js'
import Homepage from './app/home/homepage.js'
import Submission from './app/submissions/submissionWrapper.js'
import ProblemWrapper from './app/problemList/problemWrapper.js'
import ScoreboardWrapper from './app/scoreboard/scoreboardWrapper'
import Notify from './app/notifier/notify.js'
import { slideIn } from './app/globalStatusBar/lib/libTransition.js'

import SubmissionLauncher from './app/submissions/submissionLauncher.js'
import ProblemLauncher from './app/problemList/problemLauncher.js'
import ScoreboardLauncher from './app/scoreboard/scoreboardLauncher.js'
import HomepageLauncher from './app/home/homepageLauncher.js'

import verifyLogin from './app/globalStatusBar/login/stub/credential.js'
import publicParse from './app/globalStatusBar/staticStub/public.js'
import { toggleSidenav } from './app/sidenav/sidenav.js'

class Hestia extends React.Component {
    constructor(props) {
        super(props)
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
            },

            redirect: undefined,

        }
    }

    componentWillMount() {
        publicParse().then((data) => {
            this.setState({
                contestName: data.name,
                contestTime : data.time
            })
        })
        verifyLogin().then((data) => {
            this.setState({
                user: {
                    loggedIn: data.ok,
                    username: data.username,
                    id: data.id
                },
            });
        })
    }

    render() {
        if (this.state.redirect) {
            let out = <Router forceRefresh>{this.state.redirect}</Router>
            return out;
        }
        return (
            <>
                <Notify
                    autoHideDuration={1000}
                    TransitionComponent={props => slideIn(props, 'left')}
                    transitionDuration={{
                        enter: 10,
                        exit: 100,
                    }}
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom',
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
                                    page : <HomepageLauncher button onClick={toggleSidenav}/>,
                                    link : '/'
                                },
                                {
                                    page : <SubmissionLauncher button onClick={toggleSidenav}/>,
                                    link : '/submissions'
                                },
                                {
                                    page : <ProblemLauncher button onClick={toggleSidenav}/>,
                                    link : '/problems'
                                },
                                {
                                    page : <ScoreboardLauncher button onClick={toggleSidenav}/>,
                                    link : '/scoreboard'
                                }
                            ]}
                        />
                        <Route path="/submissions" component={Submission} />
                        <Route path="/problems" component={ProblemWrapper} />
                        <Route path="/scoreboard" component={ScoreboardWrapper} />
                        <Route path="/" component={Homepage} />
                    </div>
                </Router>
            </>
        )
    }
}

ReactDOM.render(<Hestia />, document.querySelector('#root'))
