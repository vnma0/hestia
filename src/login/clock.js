// time remaining to contest end
import React, { Component } from 'react';

import {Button} from '@material-ui/core';
import AccessTime from '@material-ui/icons/AccessTime'

class CountdownClock extends Component {
    render() {
        return (
            <Button style={{color: 'white'}} disabled>
                <AccessTime style={{marginRight : '10px'}}/>
                {this.props.timeLeft} / {this.props.duration}
            </Button>
        )
    }
}

export default CountdownClock;