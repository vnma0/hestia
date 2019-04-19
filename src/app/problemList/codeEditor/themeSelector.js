import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { MenuItem, Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';
import LocalizedMessage from 'react-l10n';

import friendlyTheme from './themeParser.js';
const themes = [
    'ambiance',
    'cobalt',
    'eclipse',
    'monokai',
    'solarized_dark',
    'solarized_light',
    'tomorrow',
    'tomorrow_night',
    'tomorrow_night_blue',
    'tomorrow_night_bright',
    'xcode'
];

/**
 * @name LangSelection
 * @description Language chooser
 * @property {Function} `onChange` - function to execute when a theme has been chosen.
 *                                       Signature : `function (newThemeId : number, theme : string)`
 * @returns {React.Component} a `<Button />` component displaying current chosen language
 */

class themeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // anchor element to pin the list
            anchorEl: undefined
        };
        this.handleChoice = this.handleChoice.bind(this);
    }

    handleChoice(themeId) {
        this.setState({
            anchorEl: undefined
        });
        if (typeof this.props.onChange === 'function') this.props.onChange(themeId, themes[themeId]);
    }

    render() {
        let { choice } = this.props;
        let displayed = friendlyTheme[themes[choice]];
        let themeList = themes.map((x, i) => (
            <MenuItem onClick={() => this.handleChoice(i)} key={`theme_ace_${i}`}>
                {friendlyTheme[x]}
            </MenuItem>
        ));

        return (
            <>
                <Tooltip
                    title={<LocalizedMessage id='problems.codeEditor.control.themeSelector.tooltip' />}
                    placement='bottom'>
                    <Button
                        variant='contained'
                        aria-owns={this.state.anchorEl ? 'menu' : undefined}
                        aria-haspopup={true}
                        onClick={event => this.setState({ anchorEl: event.currentTarget })}>
                        {/* setting anchor to trigger opening of menu */}
                        {displayed || <LocalizedMessage id='problems.codeEditor.control.themeSelector.nullChoice' />}
                    </Button>
                </Tooltip>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.anchorEl !== undefined}
                    onClose={() => this.setState({ anchorEl: undefined })}>
                    {themeList}
                </Menu>
            </>
        );
    }
}

themeSelector.propTypes = {
    onChange: PropTypes.func
};

export default themeSelector;
