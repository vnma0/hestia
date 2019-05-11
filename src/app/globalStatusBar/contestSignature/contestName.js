import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import { Redirect } from 'react-router-dom';

/**
 * @name ContestNameText : Contest name
 * @param {String} contestName : Contest name
 * @return {React.Component} : A `@material-ui/core/Typography` component that shows current contest name.
 *                             In case the component has children, only them get rendered.
 * @author minhducsun2002
 */

class ContestNameText extends Component {
    componentDidUpdate() {
        if ((this.state || {}).redirect)
            // setState only if truthy
            // prevent infinite loops
            this.setState({
                redirect: false
                // avoid error from react-router
            });
    }
    render() {
        return (
            <Typography variant='h5' color='inherit' onClick={() => this.setState({ redirect: true })}>
                <span>
                    {(this.state || {}).redirect && <Redirect to='/' />}
                    {this.props.children ? this.props.children : this.props.contestName}
                </span>
            </Typography>
        );
    }
}

export default ContestNameText;
