import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'typeface-roboto';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { isUndefined } from 'util';

import GlobalStatusBar from './app/globalStatusBar/globalStatusBar.js'
import Sidenav from './app/sidenav/sidenav.js';
import Submission from './app/submissions/submissionWrapper.js';
import ProblemList from './app/problemList/problemList.js';
import ScoreboardWrapper from './app/scoreboard/scoreboardWrapper';
import Notify from './app/notifier/notify.js'
import { slideIn } from './app/globalStatusBar/lib/libTransition.js';

import SubmissionLauncher from './app/submissions/submissionLauncher.js';
import ProblemLauncher from './app/problemList/problemLauncher.js';
import ScoreboardLauncher from './app/scoreboard/scoreboardLauncher.js';

import verifyLogin from './app/globalStatusBar/login/stub/credential.js';
import publicParse from './app/globalStatusBar/staticStub/public.js';

import timeAgo from './external/timeAgo.js';

class Hestia extends React.Component {
    constructor(props) {
        super(props);
        window.hestia = {
            user : {},
            contest : {},
            submissions : [],
            problem : {}
        };
        this.state = {
            sidebarOpen : false,
            currentPage : 'front',
            loggedIn : false,
            username : '',

            contestName: '',
            contestTimeLeft : '',
            contestDuration : '',
            contestEnded: false,

            redirect : undefined,

            notifyMessage : undefined,
            open: false
        }
        this.updateState = this.updateState.bind(this);
        this.contestTimeout = this.contestTimeout.bind(this);
        this.notify = this.notify.bind(this);
        window.hestia.pushNotification = this.notify
        window.hestia.updateState = this.updateState;
    }

    contestTimeout() {
        let current = new Date();
        try {
            if (window.hestia.contest.time.end && window.hestia.contest.time.end < current)
                return this.setState({
                    contestTimeLeft: "Ended",
                    contestDuration : "Ended",
                    contestEnded : true
                })
            if (window.hestia.contest.time.start > current)
                return this.setState({
                    contestTimeLeft: timeAgo(current, window.hestia.contest.time.start)
                })
            this.setState({
                contestTimeLeft : timeAgo(current, window.hestia.contest.time.end)
            });
        }
        catch (err) { 
            return;
        }
    }

    componentWillMount() {
        publicParse(this.updateState);
        verifyLogin(() => {
                this.setState({
                    loggedIn : window.hestia.user.loggedIn,
                    username : window.hestia.user.username
                })
                this.setState({
                    clockInterval : setInterval(this.contestTimeout, 1000)
                })
            }
        );
    }

    componentWillUnmount() {
        clearInterval(this.state.clockInterval);
    }

    updateState() {
        this.setState({
            loggedIn : window.hestia.user.loggedIn,
            username : window.hestia.user.username,

            contestName : window.hestia.contest.name,
            contestDuration : 
                timeAgo(window.hestia.contest.time.start, window.hestia.contest.time.end)
        })
        this.contestTimeout();
    }

    notify(message) {
        this.setState({
            message: message,
            open: true
        });
        // setTimeout(() => this.setState({ message : undefined, open: false }), 3000)
    }

    render() {
        if (this.state.redirect) {
            this.setState({
                redirect: undefined,
            })
            return <Router>{this.state.redirect}</Router>
        }
        return (
            <>
                <Notify open={this.state.open && !isUndefined(this.state.message)} 
                    onClose={() => this.setState({ open: false, message: undefined })} 
                    message={this.state.message} autoHideDuration={1000}
                    TransitionComponent={(props) => slideIn(props, 'left')} 
                    transitionDuration={{
                        enter: 10,
                        exit: 100
                    }}
                    anchorOrigin={{
                        horizontal : 'center',
                        vertical: 'top'
                    }}/>
                <GlobalStatusBar contestName={this.state.contestName} currentUser={this.state.username}
                    contestTimeLeft={this.state.contestTimeLeft}
                    contestDuration={this.state.contestDuration}
                    loggedIn={this.state.loggedIn}
                    menuOpen={() => this.setState({
                        sidebarOpen : true
                    })}/>
                {/* {this.state.currentPage === "submissions" && <Submission />}
                {this.state.currentPage === 'problems' && <ProblemList />}
                {this.state.currentPage === 'scoreboard' && <ScoreboardWrapper />} */}
                <Router>
                    <div>
                        <Sidenav open={this.state.sidebarOpen} onClose={() => this.setState({
                            sidebarOpen: false
                        })} pages={[
                                <SubmissionLauncher onClick={() => this.setState({
                                    redirect : <Redirect push to="/submissions"/>,
                                    sidebarOpen: false
                                })} button/>,
                                <ProblemLauncher onClick={() => this.setState({
                                    redirect : <Redirect push to="/problems"/>,
                                    sidebarOpen: false
                                })} button/>,
                                <ScoreboardLauncher onClick={() => this.setState({
                                    redirect : <Redirect push to="/scoreboard"/>,
                                    sidebarOpen: false
                                })} button/>
                        ]} />
                        <Route path="/submissions" component={Submission} />
                        <Route path="/problems" component={ProblemList}/>
                        <Route path="/scoreboard" component={ScoreboardWrapper}/>
                    </div>
                </Router>
            </>
        )
    }
}

ReactDOM.render(<Hestia />, document.querySelector('#root'));