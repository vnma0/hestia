import React from 'react'
import Error from '@material-ui/icons/Error'

/**
 * @name ExitErrorVerdictSignature
 * @desc 'Error during runtime' verdict's icon, margin-and-color-calibrated
 * @returns {<Error />} An 'error' SVG icon
 */

class ExitErrorVerdictSignature extends React.Component {
    render() {
        return (
            <Error
                style={{ marginRight: 10, marginTop: -2.5, color: '#d500f9' }}
            />
        )
    }
}

export default ExitErrorVerdictSignature
