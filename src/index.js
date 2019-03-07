import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'typeface-roboto'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { isUndefined } from 'util'

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

import timeAgo from './external/timeAgo.js'

class Hestia extends React.Component {
    constructor(props) {
        super(props)
        window.hestia = {}
        this.state = {
            sidebarOpen: false,
            currentPage: 'front',
            user: {
                loggedIn: false,
                username: '',
                id: ''
            },

            contestName: '',
            contestTimeLeft: '',
            contestTimeStart: new Date(), contestTimeEnd: new Date(),
            contestStarted: true,
            contestEnded: false,

            redirect: undefined,

            notifyMessage: undefined,
            open: false,
        }
        this.contestTimeout = this.contestTimeout.bind(this)
        
        this.notify = this.notify.bind(this)
        window.hestia.pushNotification = this.notify
    }

    contestTimeout() {
        let current = new Date()
        if (this.state.contestTimeStart && this.state.contestTimeEnd < current)
        // contest already ended
            return this.setState({
                contestEnded: true
            })
        if (current < this.state.contestTimeStart)
        // contest is not started
            return this.setState({
                contestTimeLeft: timeAgo(current, this.state.contestTimeStart),
                contestStarted: false
            })
        // contest is in progress
        else this.setState({
            contestTimeLeft: timeAgo(current, this.state.contestTimeEnd),
            contestStarted: true
        })
    }

    componentWillMount() {
        publicParse().then((data) => {
            this.setState({
                contestName: data.name,
                contestTimeStart: data.time.start,
                contestTimeEnd: data.time.end
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
            setInterval(this.contestTimeout, 1000)
        })
    }

    notify(message) {
        this.setState({
            message: message,
            open: true,
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
                    open={this.state.open && !isUndefined(this.state.message)}
                    onClose={() =>
                        this.setState({ open: false, message: undefined })
                    }
                    message={this.state.message}
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
                    loggedIn={this.state.user.loggedIn}
                    started={this.state.contestStarted}
                    ended={this.state.contestEnded}
                    contestName={this.state.contestName}
                    contestTimeLeft={this.state.contestTimeLeft}
                    contestDuration={timeAgo(this.state.contestTimeStart, this.state.contestTimeEnd)}
                    menuOpen={() =>
                        this.setState({
                            sidebarOpen: true,
                        })
                    }
                />
                <Router>
                    <div>
                        <Sidenav
                            open={this.state.sidebarOpen}
                            onClose={() =>
                                this.setState({
                                    sidebarOpen: false,
                                })
                            }
                            pages={[
                                <HomepageLauncher button
                                    onClick={() =>
                                        this.setState({
                                            redirect: <Redirect push to="/" />,
                                            sidebarOpen: false,
                                        })
                                    }
                                />,
                                <SubmissionLauncher button
                                    onClick={() =>
                                        this.setState({
                                            redirect: <Redirect push to="/submissions" />,
                                            sidebarOpen: false,
                                        })
                                    }
                                />,
                                <ProblemLauncher button
                                    onClick={() =>
                                        this.setState({
                                            redirect: <Redirect push to="/problems" />,
                                            sidebarOpen: false,
                                        })
                                    }
                                />,
                                <ScoreboardLauncher button
                                    onClick={() =>
                                        this.setState({
                                            redirect: <Redirect push to="/scoreboard" />,
                                            sidebarOpen: false,
                                        })
                                    }
                                />
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
