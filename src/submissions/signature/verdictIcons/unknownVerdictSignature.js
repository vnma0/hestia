import React from 'react';
import HelpOutline from '@material-ui/icons/HelpOutline';

/**
 * @name UnknownVerdictSignature
 * @desc 'Memory exhausted' verdict's icon, margin-and-color-calibrated
 * @returns {<HelpOutline />} An 'help' SVG icon 
 */

class UnknownVerdictSignature extends React.Component {
    render() {
        return <HelpOutline style={{marginRight : 10, marginTop: -2.5, color: 'black'}}/>
    }
}

export default UnknownVerdictSignature;