import React, {Component} from 'react';
import {Typography} from '@material-ui/core'

/**
 * @name VerdictSignature : Submission's judged verdict. FlexGrow.
 *                          All props are passed down to <Typography>.
 * @param {String} verdict : Judged verdict.
 * @param {Boolean} success : Whether the submission's state is positive.
 * @param {Boolean} failed : Whether the submission's state is negative.
 *                           Takes precedent over props.success.
 * @return {React.Component} : A <Typography> that shows the verdict.
 *                             Children override if exist.
 * @author minhducsun2002
 */

class VerdictSignature extends Component {
    render() {
        return (
        <Typography variant='body1' style={{
            flexGrow: 1,
            color: this.props.success ? 'green' : (this.props.failed ? 'red' : '')
        }} {...this.props}>{this.props.children ? this.props.children : this.props.verdict}</Typography>
        )
    }
}

export default VerdictSignature;