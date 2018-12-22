import React, {Component} from 'react';
import {Typography} from '@material-ui/core'

/**
 * @name ContestNameText Contest name
 * @param {String} contestName contest name
 * @return {React.Component} a @material-ui/core/Typography that shows current contest name
 * @author minhducsun2002
 */

class ContestNameText extends Component {
    render() {
        return (
        <Typography variant="h5" color="inherit" style={{
            flexGrow: 1
        }}>{this.props.contestName}</Typography>
        )
    }
}

export default ContestNameText;