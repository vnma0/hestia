import React from 'react';
import Scoreboard from './scoreboard.js'

import score from './stub/score.js';

class ScoreboardWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreboard: [],
            problem: []
        }
    }


    componentDidMount() {
        score(() => {
            let b = window.hestia.contest.scoreboard.map(record => {
                let a = record.result;
                for (let key in record.result) {
                    if (record.result[key].pri === null)
                        record.result[key].pri = '∅';
                    record.result[key] = record.result[key].pri;
                }
                a = Object.assign(a, {
                    Name : record.name,
                    Penalty : Number(record.score),
                    AC : record.aced
                })
                return a;
            })

            this.setState({
                scoreboard : b,
                problem: window.hestia.contest.problemList
            });
        })
    }

    render() {
        return <Scoreboard problem={this.state.problem} data={this.state.scoreboard} 
            header={[{ name: "Name" }, { name: "Penalty" }, { name : "AC" }]}/>
    }
}

export default ScoreboardWrapper;