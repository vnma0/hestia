import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { MenuItem, Tooltip } from "@material-ui/core";

import PropTypes from "prop-types";

/**
 * @name LangSelection
 * @description Language chooser
 * @property {Function} `handleChange` - function to execute when a language has been chosen.
 *                                       Signature : `function (newLanguage : String)`
 * @property {Array : String} `displayLang` - (Required) Array containing extensions allowed for submission source files.
 * @returns {React.Component} a `<Button />` component displaying current chosen language
 */

class LangSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: undefined
        };
        this.handleChoice = this.handleChoice.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleChoice(newLang) {
        this.setState({
            anchorEl: undefined
        });
        this.props.handleChange(newLang);
    }

    render() {
        return (
            <>
                <Tooltip title="Change language" placement="bottom">
                    <Button
                        variant="contained"
                        aria-owns={this.state.anchorEl ? "menu" : undefined}
                        aria-haspopup={true}
                        onClick={this.handleClick}>
                        {this.props.children || "Not chosen"}
                    </Button>
                </Tooltip>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.anchorEl !== undefined}
                    onClose={() => this.setState({ anchorEl: undefined })}>
                    {this.props.displayLang.map((x, i) => (
                        <MenuItem onClick={() => this.handleChoice(i)} key={i}>
                            {x}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        );
    }
}

LangSelection.propTypes = {
    handleChange: PropTypes.func,
    displayLang: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default LangSelection;
