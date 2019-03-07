import React from 'react'
import Scoreboard from './scoreboard.js'

import score from './stub/score.js'
import publicParse from '../globalStatusBar/staticStub/public.js';

class ScoreboardWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: [],
            problems: [],

            interval: undefined,
        }
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        publicParse().then((data) => {
            this.setState({
                problems: data.problems,
            })
        })
        this.update()
        setInterval(this.update, 30000)
    }

    update() {
        score().then((data) => {
            this.setState({
                result: data
            })
        })
    }

    render() {
        return (
            <div
                style={{
                    overflowX: 'auto',
                }}
            >
                <Scoreboard problems={this.state.problems} results={this.state.result}/>
            </div>
        )
    }
}

export default ScoreboardWrapper
