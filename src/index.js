import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import GlobalStatusBar from './globalStatusBar/globalStatusBar.js'
import Sidenav from './sidenav/sidenav.js';
import { Button } from '@material-ui/core';

class Hestia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen : false
        }
    }
    render() {
        return (
            <>
                <GlobalStatusBar contestName="Kỳ thi 1" currentUser="Test User"
                    contestTimeLeft="00:00:00" contestDuration="23:59:59" loggedIn={true}
                    menuOpen={() => this.setState({
                        sidebarOpen : true
                    })}/>
                <Sidenav open={this.state.sidebarOpen} onClose={() => this.setState({
                    sidebarOpen: false
                })} pages={[
                    <Button onClick={() => alert(1)}>Alert (1)</Button>
                ]} />
            </>
        )
    }
}

ReactDOM.render(<Hestia/>, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
