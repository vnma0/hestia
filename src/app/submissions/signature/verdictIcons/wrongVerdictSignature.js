import React from 'react';
import Clear from '@material-ui/icons/Clear';

/**
 * @name WrongVerdictIcon
 * @desc 'Wrong' verdict's icon, margin-and-color-calibrated
 * @returns {<Clear />} A 'checked' SVG icon
 */

class WrongVerdictIcon extends React.Component {
    render() {
        return <Clear style={{ marginRight: 10, marginTop: -2.5, color: 'red' }} />;
    }
}

export default WrongVerdictIcon;
