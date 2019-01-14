import React, {Component} from 'react';
import {Typography, Grid} from '@material-ui/core'
import AccessTime from '@material-ui/icons/AccessTime';

/**
 * @name ExecTimeSignature : Execution time of the submission. FlexGrow. 
 *                       All props are passed down to <Typography>.
 * @param {String} time : Time string.
 * @return {React.Component} : A <Typography> that shows the submission's execution time.
 *                             Children override if exist.
 * @author minhducsun2002
 */

class ExecTimeSignature extends Component {
    render() {
        /**
         * @author minhducsun2002
         * @desc Here I just, er, well, use <Grid> to align things properly.
         */
        return (
            <Grid container spacing={8} alignItems="flex-start" justify="space-between">
                <Grid item>
                    <AccessTime style={{marginRight : '10px', marginTop: '2.5px'}}/>
                </Grid>
                <Grid item>
                    <Typography variant='overline' color="inherit" style={{
                        flexGrow: 1, display: 'inline-block'
                    }} {...this.props}>
                        {this.props.children ? this.props.children : this.props.time}
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default ExecTimeSignature;