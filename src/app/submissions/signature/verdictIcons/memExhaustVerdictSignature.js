import React from 'react';
import Memory from '@material-ui/icons/Memory';

/**
 * @name MemExhaustedVerdictSignature
 * @desc 'Memory exhausted' verdict's icon, margin-and-color-calibrated
 * @returns {<Memory />} A 'checked' SVG icon
 */

class MemExhaustedVerdictSignature extends React.Component {
    render() {
        return <Memory style={{ marginRight: 10, marginTop: -2.5, color: 'blue' }} />;
    }
}

export default MemExhaustedVerdictSignature;
