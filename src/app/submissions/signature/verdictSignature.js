import React, { Component } from 'react'
import { Typography, Grid } from '@material-ui/core'

import AcceptedVerdictIcon from './verdictIcons/acceptedVerdictSignature.js'
import WrongVerdictIcon from './verdictIcons/wrongVerdictSignature.js'
import TimeoutVerdictIcon from './verdictIcons/timeoutVerdictSignature.js'
import MemExhaustedVerdictSignature from './verdictIcons/memExhaustVerdictSignature.js'
import ExitErrorVerdictSignature from './verdictIcons/exitErrorVerdictSignature.js'
import UnknownVerdictSignature from './verdictIcons/unknownVerdictSignature'
import PendingVerdictSignature from './verdictIcons/pendingVerdictSignature'
import CompilationErrorVerdictSignature from './verdictIcons/compilationErrorVerdictSignature.js'

/**
 * @name VerdictSignature : Submission's judged verdict. FlexGrow.
 *                          All props are passed down to <Typography>.
 * @param {String} verdict : Judged verdict.
 * @param {Boolean} iconOnly : Whether to return icon only or with the verdict text.
 * @param {Boolean} reversed : Whether the verdict text should appear before or after the icon.
 * @return {React.Component} : A <Typography> that shows the verdict.
 *                             Children override if exist.
 * @author minhducsun2002
 */

const verdictIcon = {
    AC: <AcceptedVerdictIcon />,
    Accepted: <AcceptedVerdictIcon />,

    WA: <WrongVerdictIcon />,
    'Wrong answer': <WrongVerdictIcon />,
    'Wrong output': <WrongVerdictIcon />,

    TLE: <TimeoutVerdictIcon />,
    'Time limit violated': <TimeoutVerdictIcon />,
    'Time limit exceeded': <TimeoutVerdictIcon />,

    MLE: <MemExhaustedVerdictSignature />,
    'Memory limit exceeded': <MemExhaustedVerdictSignature />,

    RE: <ExitErrorVerdictSignature />,
    RTE: <ExitErrorVerdictSignature />,
    'Runtime error': <ExitErrorVerdictSignature />,

    CE: <CompilationErrorVerdictSignature />,

    Pending: <PendingVerdictSignature />,

    Unknown: <UnknownVerdictSignature />,
}

// CSS colour of verdicts
const color = {
    AC: 'green',
    Accepted: 'green',

    WA: 'red',
    'Wrong answer': 'red',
    'Wrong output': 'red',

    TLE: '#ff3d00',
    'Time limit violated': '#ff3d00',

    MLE: '',

    RE: '#d500f9',
    RTE: '#d500f9',

    Pending: 'blue',

    CE: '#632920',
}

class VerdictSignature extends Component {
    constructor(props) {
        super(props)
        // in order to allow reversion, we render HERE.
        this.state = {
            icon: (
                <Grid item>
                    {verdictIcon[this.props.verdict]
                        ? verdictIcon[this.props.verdict]
                        : verdictIcon['Unknown']}
                </Grid>
            ),
            verdictText: (
                <Grid item>
                    <Typography
                        variant="body1"
                        style={{
                            flexGrow: 1,
                            color: color[this.props.verdict],
                            fontWeight: this.props.success ? 'bold' : '',
                        }}
                        {...this.props}
                    >
                        {this.props.children
                            ? this.props.children
                            : this.props.verdict}
                    </Typography>
                </Grid>
            ),
        }
    }
    render() {
        if (this.props.iconOnly) return verdictIcon[this.props.verdict]
        else
            return (
                <Grid container spacing={0} alignItems="flex-start">
                    {this.props.reversed ? (
                        <>
                            {this.state.verdictText}
                            {this.state.icon}
                        </>
                    ) : (
                        <>
                            {this.state.icon}
                            {this.state.verdictText}
                        </>
                    )}
                </Grid>
            )
    }
}

export default VerdictSignature
