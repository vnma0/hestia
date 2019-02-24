// time remaining to contest end
import React, { Component } from 'react'

import { Button } from '@material-ui/core'
import AccessTime from '@material-ui/icons/AccessTime'

/**
 * @name CountdownClock
 * @description A simple clock that shows time left and the duration of the contest
 * @property {string} timeLeft : time left until the end of the contest
 * @property {string} duration : time allocated for the whole contest
 * @property {Boolean} ended : whether contest stopped
 * @returns {React.Component} : a @material-ui/core/Button that shows the current time
 *                              or (in case supplied) content passed as children.
 *                              If both are supplied, only the children components get rendered.
 * @example <CountdownClock timeLeft="00:00:01" duration="23:59:59" />
 * @author minhducsun2002
 */

class CountdownClock extends Component {
    render() {
        return (
            <Button
                style={
                    this.props.ended
                        ? {
                              color: 'white',
                              backgroundColor: 'black',
                              // if contest is running, yellow background
                          }
                        : {
                              color: 'black',
                              backgroundColor: 'yellow',
                              // else we just make it black
                          }
                }
                disabled
            >
                <AccessTime style={{ marginRight: '10px' }} />
                {this.props.children
                    ? this.props.children
                    : this.props.timeLeft + ' / ' + this.props.duration}
            </Button>
        )
    }
}

export default CountdownClock
