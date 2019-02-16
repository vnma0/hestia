import React, { Component } from 'react'
import { Typography, Grid } from '@material-ui/core'
import Memory from '@material-ui/icons/Memory'

/**
 * @name MemorySignature : Submission's memory consumption. FlexGrow.
 *                       All props are passed down to <Typography>.
 * @param {String} memory : Memory consumption.
 * @return {React.Component} : A <Typography> that shows the timestamp of current submission.
 *                             Children override if exist.
 * @author minhducsun2002
 */

class MemorySignature extends Component {
    render() {
        /**
         * @author minhducsun2002
         * @desc Here I just, er, well, use <Grid> to align things properly.
         */
        return (
            <Grid container spacing={8} alignItems="flex-start">
                <Grid item>
                    <Memory
                        style={{ marginRight: '10px', marginTop: '2.5px' }}
                    />
                </Grid>
                <Grid item>
                    <Typography
                        variant="overline"
                        color="inherit"
                        style={{
                            flexGrow: 1,
                            display: 'inline-block',
                        }}
                        {...this.props}
                    >
                        {this.props.children
                            ? this.props.children
                            : this.props.memory}
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default MemorySignature
