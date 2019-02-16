import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

/**
 * @name ProblemSignature : Problem's ID / name / whatever. FlexGrow.
 *                          All props are passed down to <Typography>.
 * @param {String} problemName : Problem name/ID/whatever.
 * @return {React.Component} : A <Typography> that shows the current problem.
 *                             Children override if exist.
 * @author minhducsun2002
 */

class ProblemSignature extends Component {
    render() {
        return (
            <Typography
                variant="body1"
                color="inherit"
                style={{
                    flexGrow: 1,
                }}
                {...this.props}
            >
                {this.props.children
                    ? this.props.children
                    : this.props.problemName}
            </Typography>
        )
    }
}

export default ProblemSignature
