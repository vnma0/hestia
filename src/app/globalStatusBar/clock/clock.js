// time remaining to contest end
import React, { Component } from 'react'

import { Button, Tooltip } from '@material-ui/core'
import AccessTime from '@material-ui/icons/AccessTime'

import timeAgo from '../../../external/timeAgo.js';
import './clock.css'

/**
 * @name CountdownClock
 * @description A simple clock that shows time left and the duration of the contest
 * @param {Object <Date, Date>} `time` - Object containing two properties, `start` and `end` representing start & end time
 * @author minhducsun2002
 */

class CountdownClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current : timeAgo(new Date(), this.props.time.end),
            duration : timeAgo(this.props.time.start, this.props.time.end),
            started : new Date() > this.props.time.start,
            ended : this.props.time.end < new Date(),

            clockStyleClass : 'clock-inprogress'
        }

        this.setClassName = this.setClassName.bind(this)
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                current : timeAgo(new Date(), this.props.time.end),
                duration : timeAgo(this.props.time.start, this.props.time.end),
                started : new Date() > this.props.time.start,
                ended : this.props.time.end < new Date(),

                clockStyleClass : this.setClassName()
            })
        }, 1000)
    }

    setClassName() {
        if (!this.state.started) return 'clock-notstarted'
        if (this.state.started && !this.state.ended) return 'clock-inprogress'
        if (this.state.ended) return 'clock-ended'
    }

    render() {
        return (
            <Tooltip placement="bottom"
                title={`${(this.props.time.start).toLocaleString()}`
                        + ` - ${(this.props.time.end).toLocaleString()}`}>
                <span>
                    <Button disabled id="clock" className={this.state.clockStyleClass}>
                        <AccessTime style={{ marginRight: '10px' }} />
                        {this.state.ended
                            ? 'ENDED' : (this.state.started 
                                ? `TIME LEFT : ${this.state.current} / ${this.state.duration}`
                                : `${timeAgo(new Date(), this.props.time.start)} BEFORE START`)}
                    </Button>
                </span>
            </Tooltip>
        )
    }
}

export default CountdownClock
