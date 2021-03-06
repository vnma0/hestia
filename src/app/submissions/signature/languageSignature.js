import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

/**
 * @name LanguageSignature : Language's ID / name / whatever. FlexGrow.
 *                          All props are passed down to <Typography>.
 * @param {String} languageName : Language name.
 * @return {React.Component} : A <Typography> that shows current language.
 *                             Children override if exist.
 * @author minhducsun2002
 */

import friendlyLang from '../../../strings/lang.json';

class LanguageSignature extends Component {
    render() {
        return (
            <Typography
                variant='subtitle2'
                color='inherit'
                style={{
                    flexGrow: 1
                }}>
                {this.props.children
                    ? this.props.children
                    : friendlyLang[
                          String(this.props.languageName)
                              .replace('.', '')
                              .toLowerCase()
                      ]}
            </Typography>
        );
    }
}

export default LanguageSignature;
