import React from 'react';
import Warning from '@material-ui/icons/Warning';

/**
 * @name CompilationErrorVerdictSignature
 * @desc 'Compilation error' verdict's icon, margin-and-color-calibrated
 * @returns {<Warning />} An 'error' SVG icon 
 */

class CompilationErrorVerdictSignature extends React.Component {
    render() {
        return <Warning style={{marginRight : 10, marginTop: -2.5, color: '#632920'}}/>
    }
}

export default CompilationErrorVerdictSignature;