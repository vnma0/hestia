import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import { Button } from '@material-ui/core';

import GlobalStatusBar from './app/globalStatusBar/globalStatusBar.js'
import Sidenav from './app/sidenav/sidenav.js';
import SubmissionTable from './app/submissions/submissionTable.js';
import ProblemList from './app/problemList/problemList.js';

import SubmissionLauncher from './app/submissions/submissionLauncher.js';
import ProblemLauncher from './app/problemList/problemLauncher.js'

class Hestia extends React.Component {
    constructor(props) {
        super(props);
        window.hestia = {};
        this.state = {
            sidebarOpen : false,
            currentPage : 'front',
            loggedIn : false
        }
        this.changePage = this.changePage.bind(this);
        this.updateLoginState = this.updateLoginState.bind(this);
        window.hestia.updateLoginState = this.updateLoginState;
    }

    changePage(to) {
        this.setState({
            currentPage: to,
            sidebarOpen: false
            // close after clicking
        })
    }

    updateLoginState() {
        this.setState({
            loggedIn : window.hestia.loggedIn
        })
    }

    render() {
        // initialize global variable
        return (
            <>
                <GlobalStatusBar contestName="Kỳ thi 1" currentUser="Test User"
                    contestTimeLeft="00:00:00" contestDuration="23:59:59" loggedIn={this.state.loggedIn}
                    menuOpen={() => this.setState({
                        sidebarOpen : true
                    })}/>
                <Sidenav open={this.state.sidebarOpen} onClose={() => this.setState({
                    sidebarOpen: false
                })} pages={[
                    <Button onClick={() => this.changePage('front')}>Alert (1)</Button>,
                    <SubmissionLauncher onClick={() => this.changePage('submissions')} button/>,
                    <ProblemLauncher onClick={() => this.changePage('problems')} button/>
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
                {this.state.currentPage === "problems" && <>
                    <ProblemList problem={[
                        {
                            id: 'A', name : 'Problem 1', statement : 'Problem 1\'s statement', link : 'git-scm.com'
                        },
                        {
                            id: 'B', name : 'Problem 2', statement : 'Problem 2\'s statement', link : 'git-scm.com'
                        }
                    ]}/>
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
