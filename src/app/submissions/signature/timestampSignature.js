import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import CalendarToday from '@material-ui/icons/CalendarToday';

/**
 * @name TimestampSignature : Submission's timestamp. FlexGrow.
 *                       All props are passed down to <Typography>.
 * @param {String} time : Time string.
 * @return {React.Component} : A <Typography> that shows the timestamp of current submission.
 *                             Children override if exist.
 * @author minhducsun2002
 */

class TimestampSignature extends Component {
    render() {
        /**
         * @author minhducsun2002
         * @desc Here I just, er, well, use <Grid> to align things properly.
         */
        return (
            <Grid container spacing={8} alignItems='flex-start'>
                <Grid item>
                    <CalendarToday style={{ marginRight: '10px', marginTop: '2.5px' }} />
                </Grid>
                <Grid item>
                    <Typography
                        variant='overline'
                        color='inherit'
                        style={{
                            flexGrow: 1,
                            display: 'inline-block'
                        }}
                        {...this.props}>
                        {this.props.children ? this.props.children : this.props.time}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default TimestampSignature;
