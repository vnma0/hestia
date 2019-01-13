import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import { Button } from '@material-ui/core';

import GlobalStatusBar from './app/globalStatusBar/globalStatusBar.js'
import Sidenav from './app/sidenav/sidenav.js';
import Submission from './app/submissions/submissionWrapper.js';

import SubmissionLauncher from './app/submissions/submissionLauncher.js';

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
            contestEnded: false
        }
        this.changePage = this.changePage.bind(this);
        this.updateState = this.updateState.bind(this);
        this.contestTimeout = this.contestTimeout.bind(this);

        window.hestia.updateState = this.updateState;
    }

    contestTimeout() {
        let current = new Date();
        if (window.hestia.contest.time.end < current)
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

    changePage(to) {
        this.setState({
            currentPage: to,
            sidebarOpen: false
            // close after clicking
        })
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

    render() {
        return (
            <>
                <GlobalStatusBar contestName={this.state.contestName} currentUser={this.state.username}
                    contestTimeLeft={this.state.contestTimeLeft}
                    contestDuration={this.state.contestDuration}
                    loggedIn={this.state.loggedIn}
                    menuOpen={() => this.setState({
                        sidebarOpen : true
                    })}/>
                <Sidenav open={this.state.sidebarOpen} onClose={() => this.setState({
                    sidebarOpen: false
                })} pages={[
                    <Button onClick={() => this.changePage('front')}>Alert (1)</Button>,
                    <SubmissionLauncher onClick={() => this.changePage('submissions')} button/>,
                ]} />
                {this.state.currentPage === "submissions" && <>
                    <Submission />
                </>}
            </>
        )
    }
}

ReactDOM.render(<Hestia />, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
