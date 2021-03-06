import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { MenuItem, Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';

import friendlyLang from '../../../strings/lang.json';
import { withNamespaces } from 'react-i18next';

/**
 * @param str {String}: Text file extension
 */
function getFriendlyExtension(str) {
    return (
        friendlyLang[
            String(str)
                .replace('.', '')
                .toLowerCase()
        ] || str
    );
}

/**
 * @name LangSelection
 * @description Language chooser
 * @property {Function} `handleChange` - function to execute when a language has been chosen.
 *                                       Signature : `function (newLanguageId : Number)`
 * @property {Array : String} `displayLang` - (Required) Array containing extensions allowed for submission source files.
 * @returns {React.Component} a `<Button />` component displaying current chosen language
 */

class LangSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // anchor element to pin the list
            anchorEl: undefined
        };
    }

    handleChoice = newLang => {
        this.setState({
            anchorEl: undefined
        });
        if (typeof this.props.handleChange === 'function') this.props.handleChange(newLang);
    };

    render() {
        const { ext, choice, t } = this.props;
        const displayed = getFriendlyExtension(ext[choice]);
        const langList = ext.map((x, i) => (
            <MenuItem onClick={() => this.handleChoice(i)} key={`lang-${i}`}>
                {getFriendlyExtension(String(x))}
            </MenuItem>
        ));

        return (
            <>
                <Tooltip title={t('problems.codeEditor.control.langSelector.tooltip')} placement='bottom'>
                    <Button
                        variant='contained'
                        aria-owns={this.state.anchorEl ? 'menu' : undefined}
                        aria-haspopup={true}
                        onClick={event => this.setState({ anchorEl: event.currentTarget })}>
                        {/* setting anchor to trigger opening of menu */}
                        {displayed || t('problems.codeEditor.control.langSelector.nullChoice')}
                    </Button>
                </Tooltip>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.anchorEl !== undefined}
                    onClose={() => this.setState({ anchorEl: undefined })}>
                    {langList}
                </Menu>
            </>
        );
    }
}

LangSelection.propTypes = {
    handleChange: PropTypes.func
};

export default withNamespaces()(LangSelection);
