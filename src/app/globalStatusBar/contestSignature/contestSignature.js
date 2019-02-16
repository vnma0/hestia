import React, { Component } from 'react'
import ContestNameText from './contestName.js'

/**
 * @name ContestSignature
 * @description Contest signature : a name (icon support will be added later)
 * @param {String} contestName contestName
 * @return {React.Component} an empty-tag component containing <ContestNameText /
 * @author minhducsun2002
 */

class ContestSignature extends Component {
    render() {
        return (
            <>
                <ContestNameText contestName={this.props.contestName} />
                {/* <ContestIcon /> */}
            </>
        )
    }
}

export default ContestSignature
