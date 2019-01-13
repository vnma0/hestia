import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import { Button } from '@material-ui/core';

import GlobalStatusBar from './app/globalStatusBar/globalStatusBar.js'
import Sidenav from './app/sidenav/sidenav.js';
import SubmissionTable from './app/submissions/submissionTable.js';

import SubmissionLauncher from './app/submissions/submissionLauncher.js';

import verifyLogin from './app/globalStatusBar/login/stub/credential.js';
import publicParse from './app/globalStatusBar/staticStub/public.js';

class Hestia extends React.Component {
    constructor(props) {
        super(props);
        window.hestia = {
            user : {},
            contest : {}
        };
        this.state = {
            sidebarOpen : false,
            currentPage : 'front',
            loggedIn : false,
            username : '',

            contestName: '',
            contestTimeLeft : '',
            contestDuration : '',
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
                contestTimeLeft: "00:00:00"
            })
        let delta = window.hestia.contest.time.end - current;
        this.setState({
            contestTimeLeft : new Date(delta).toLocaleTimeString('vi-VN', { timeZone: 'UTC' })
        });
        // this.forceUpdate();
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
                new Date(window.hestia.contest.time.end.getTime() - window.hestia.contest.time.start.getTime())
                    .toLocaleTimeString('vi-VN', { timeZone: 'UTC' }),
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
                    <SubmissionTable submissionList={[{
                        contestant : 'minhducsun123456', problem : 'A',
                        verdict : 'Accepted', executionTime: '00:00:123', memory : '1TB', timestamp: '00:00:00',
                        language : 'Perl', tests : [
                            {verdict : 'AC', executionTime : '1000h', memory : '1TB', mark : '30'},
                            {verdict : 'AC', executionTime : '1000d', memory : '1MB', mark : '50'},
                            {verdict : 'AC', executionTime : '0.1s', memory : '5TB', mark : '300'}
                        ]
                    },{
                        contestant : 'minhducsun2002', problem : 'A',
                        verdict : 'Wrong output', executionTime: '11:00:234', memory : '1TB', timestamp: '00:00:00',
                        language : 'Pascal',
                    },{
                        contestant : 'minhducsun123456', problem : 'A',
                        verdict : 'Accepted', executionTime: '38:46:115', memory : '1TB', timestamp: '00:00:00',
                        language : 'C99', tests : [
                            {verdict : 'AC', executionTime : '5s', memory : '10TB', mark : '30'}
                        ]
                    }]}/>
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
