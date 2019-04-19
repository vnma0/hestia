import React from 'react';
import Scoreboard from './scoreboard.js';

import score from './stub/score.js';
import publicParse from '../globalStatusBar/staticStub/public.js';

class ScoreboardWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            problems: [],

            interval: undefined
        };
        this.update = this.update.bind(this);

        publicParse().then(data => {
            this.setState({
                problems: data.problems,
                mode: data.mode
            });
        });
        this.update();
    }

    componentDidMount() {
        this.componentDidUpdate();
        publicParse().then(data => {
            this.setState({
                problems: data.problems,
                mode: data.mode
            });
        });
        this.update();
        this.interval = setInterval(this.update, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        if (this.props.title) {
            document.title = String(this.props.title);
        }
    }

    update() {
        score().then(data => {
            this.setState({
                result: data
            });
        });
    }

    render() {
        return (
            <div
                style={{
                    overflowX: 'auto'
                }}>
                <Scoreboard problems={this.state.problems} results={this.state.result} mode={this.state.mode} />
            </div>
        );
    }
}

export default ScoreboardWrapper;
