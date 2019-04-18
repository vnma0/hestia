import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

/**
 * @name ContestNameText : Contest name
 * @param {String} contestName : Contest name
 * @return {React.Component} : A @material-ui/core/Typography that shows current contest name.
 *                             In case the component has children, only them get rendered.
 * @author minhducsun2002
 */

class ContestNameText extends Component {
    render() {
        return (
            <Typography
                onClick={() => (window.location = '/')}
                variant='h5'
                color='inherit'
                style={{
                    flexGrow: 1
                }}>
                {this.props.children ? this.props.children : this.props.contestName}
            </Typography>
        );
    }
}

export default ContestNameText;
