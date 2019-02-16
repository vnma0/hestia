import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

/**
 * @name ContestantSignature : Contestant's ID / name / whatever. FlexGrow.
 *                             All props are passed down to <Typography>.
 * @param {String} contestantName : Contestant name
 * @return {React.Component} : A <Typography> that shows current contestant name.
 *                             Children override if exist.
 * @author minhducsun2002
 */

class ContestantSignature extends Component {
    render() {
        return (
            <Typography
                variant="body2"
                color="inherit"
                style={{
                    flexGrow: 1,
                }}
                {...this.props}
            >
                {this.props.children
                    ? this.props.children
                    : this.props.contestantName}
            </Typography>
        )
    }
}

export default ContestantSignature
