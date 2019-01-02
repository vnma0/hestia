import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

/**
 * @name LangSelection
 * @param {Array:String} lang Language name
 * @param {Boolean} disabled If true, the button will be disabled.
 * @description The language selection tab
 */

class LangSelection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLang: 'cpp',
            anchorEl: null,
        }
        this.handleChoice = this.handleChoice.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget,
        })
    }

    handleChoice(newLang) {
        this.props.callbackFromParent(
            newLang ? newLang : this.state.currentLang
        )
        this.setState({
            currentLang: newLang ? newLang : this.state.currentLang,
            anchorEl: null,
        })
    }

    render() {
        const { lang } = this.props
        return (
            <div>
                <Button
                    disabled={this.props.disabled}
                    variant="flat"
                    aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Change Language...
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={() => this.handleChoice(null)}
                >
                    {lang.map(x => (
                        <MenuItem onClick={() => this.handleChoice(x)}>
                            {x}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}

LangSelection.defaultProps = { lang: ['cpp', 'java', 'python'] , disabled: false }

export default LangSelection;
