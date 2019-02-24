import React from 'react'
import AccessTime from '@material-ui/icons/AccessTime'

/**
 * @name TimeoutVerdictIcon
 * @desc 'Execution timed out' verdict's icon, margin-and-color-calibrated
 * @returns {<AccessTime />} A 'memory' SVG icon
 */

class TimeoutVerdictIcon extends React.Component {
    render() {
        return (
            <AccessTime
                style={{ marginRight: 10, marginTop: -2.5, color: '#ff3d00' }}
            />
        )
    }
}

export default TimeoutVerdictIcon
