// time remaining to contest end
import React, { Component } from 'react'

import { Button } from '@material-ui/core'
import AccessTime from '@material-ui/icons/AccessTime'

import timeAgo from '../../../external/timeAgo.js';

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
            ended : this.props.time.end < new Date()
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                current : timeAgo(new Date(), this.props.time.end),
                duration : timeAgo(this.props.time.start, this.props.time.end),
                started : new Date() > this.props.time.start,
                ended : this.props.time.end < new Date()
            })
        }, 1000)
    }

    render() {
        return (
            <Button
                style={
                    this.state.ended
                        ? {
                              color: 'white',
                              backgroundColor: 'black',
							  fontWeight: 'normal'
                              // if contest is running, yellow background
                          }
                        : {
                              color: 'black',
                              backgroundColor: 'yellow',
							  fontWeight: 'normal'
                              // else we just make it black
                          }
                }
                disabled
            >
                <AccessTime style={{ marginRight: '10px' }} />
                {this.state.ended
                    ? 'ENDED' : (this.props.started 
                        ? `${this.state.current} / ${this.state.duration}`
                        : `${timeAgo(new Date(), this.props.time.start)} BEFORE START`)}
            </Button>
        )
    }
}

export default CountdownClock
