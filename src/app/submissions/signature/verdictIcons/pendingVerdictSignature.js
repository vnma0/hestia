import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * @name PendingVerdictSignature
 * @desc 'Execution timed out' verdict's icon, margin-and-color-calibrated
 * @returns {<AccessTime />} A 'memory' SVG icon
 */

class PendingVerdictSignature extends React.Component {
    render() {
        return <CircularProgress size={20} style={{ marginRight: 10, marginTop: -2.5, color: 'blue' }} />;
    }
}

export default PendingVerdictSignature;
