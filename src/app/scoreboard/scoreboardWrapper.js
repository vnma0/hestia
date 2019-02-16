import React from 'react'
import Scoreboard from './scoreboard.js'

import score from './stub/score.js'

class ScoreboardWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scoreboard: [],
            problem: [],

            interval: undefined,
        }
    }

    componentDidMount() {
        score(() => {
            clearInterval(this.state.interval)
            this.setState({
                interval: setInterval(this.update, 30000),
            })
            this.update()
        })
    }

    componentWillUnmount() {
        score(() => {
            clearInterval(this.state.interval)
            this.setState({
                interval: setInterval(this.update, 1000 * 60 * 5),
            })
            this.update()
        })
    }

    update() {
        score(() => {
            let b = window.hestia.contest.scoreboard.map(record => {
                let a = record.result
                for (let key in record.result) {
                    if (record.result[key].pri === null)
                        record.result[key].pri = '∅'
                    record.result[key] = record.result[key].pri
                }
                a = Object.assign(a, {
                    Name: record.name,
                    'Stat #1': Number(record.score),
                    'Stat #2': record.aced,
                })
                return a
            })

            this.setState({
                scoreboard: b,
                problem: window.hestia.contest.problemList,
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
                <Scoreboard
                    problem={this.state.problem}
                    data={this.state.scoreboard}
                    header={[
                        { name: 'Name' },
                        { name: 'Stat #1' },
                        { name: 'Stat #2' },
                    ]}
                />
            </div>
        )
    }
}

export default ScoreboardWrapper
