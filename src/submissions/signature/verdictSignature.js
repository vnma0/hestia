import React, {Component} from 'react';
import {Typography, Grid} from '@material-ui/core'

import AcceptedVerdictIcon from './verdictIcons/acceptedVerdictSignature.js';
import WrongVerdictIcon from './verdictIcons/wrongVerdictSignature.js';
import TimeoutVerdictIcon from './verdictIcons/timeoutVerdictSignature.js';
import MemExhaustedVerdictSignature from './verdictIcons/memExhaustVerdictSignature.js';
import ExitErrorVerdictSignature from './verdictIcons/exitErrorVerdictSignature.js'

/**
 * @name VerdictSignature : Submission's judged verdict. FlexGrow.
 *                          All props are passed down to <Typography>.
 * @param {String} verdict : Judged verdict.
 * @return {React.Component} : A <Typography> that shows the verdict.
 *                             Children override if exist.
 * @author minhducsun2002
 */

const verdictIcon = {
    "AC" : <AcceptedVerdictIcon />,
    "Accepted" : <AcceptedVerdictIcon />,

    "WA": <WrongVerdictIcon />,
    "Wrong answer": <WrongVerdictIcon />,
    "Wrong output": <WrongVerdictIcon />,

    "TLE": <TimeoutVerdictIcon />,
    "Time limit violated" : <TimeoutVerdictIcon />,

    "MLE": <MemExhaustedVerdictSignature />,

    "RE": <ExitErrorVerdictSignature />,
    "RTE": <ExitErrorVerdictSignature />
}

// CSS colour of verdicts
const color = {
    "AC" : 'green',
    "Accepted" : 'green',

    "WA": 'red',
    "Wrong answer": 'red',
    "Wrong output": 'red',

    "TLE": '#ff3d00',
    "Time limit violated" : '#ff3d00',

    "MLE": 'blue',

    "RE": '#d500f9',
    "RTE": '#d500f9'
}

class VerdictSignature extends Component {
    render() {
        return (
            <Grid container spacing={0} alignItems="flex-start">
                <Grid item>
                    {verdictIcon[this.props.verdict]}
                </Grid>
                <Grid item>
                    <Typography variant='body1' style={{
                        flexGrow: 1,
                        color: color[this.props.verdict],
                        fontWeight : this.props.success ? 'bold' : ''
                    }} {...this.props}>
                        {this.props.children ? this.props.children : this.props.verdict}
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default VerdictSignature;