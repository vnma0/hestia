import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

/**
 * @name LangSelection
 * @param {Array:String} lang Language name
 * @param {Boolean} disabled If true, the button will be disabled.
 * @description The language selection tab, WORK IN PROGRESS
 */

class LangSelection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLang: null,
            anchorEl: null,
        }
        this.handleChoice = this.handleChose.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget,
        })
    }

    handleChose(newLang) {
        this.setState({
            currentLang: newLang ? newLang : this.state.currentLang,
            anchorEl: null,
        })
    }

    render() {
        return (
            <div>
                <Button
                    variant="flat"
                    aria-owns={this.state.anchorEl ? 'menu' : undefined}
                    aria-haspopup={true}
                    onClick={this.handleClick}
                >
                    {"Current Language: " + (this.state.currentLang===null ? "None" : this.state.currentLang)}
                </Button>
                <Menu
                    id="menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={() => this.handleChose(null)}
                >
                    {this.props.lang.map(x => (
                        <MenuItem onClick={() => this.handleChose(x)}>
                            {x}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}

LangSelection.defaultProps = { lang: ['cpp', 'java', 'python'] }

export default LangSelection;
