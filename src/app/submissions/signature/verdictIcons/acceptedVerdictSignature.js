import React from 'react';
import Check from '@material-ui/icons/Check';

/**
 * @name AcceptedVerdictIcon
 * @desc 'Accepted' verdict's icon, margin-and-color-calibrated
 * @returns {<Check />} A 'checked' SVG icon
 */

class AcceptedVerdictIcon extends React.Component {
    render() {
        return <Check style={{ marginRight: 10, marginTop: -2.5, color: 'green' }} />;
    }
}

export default AcceptedVerdictIcon;
