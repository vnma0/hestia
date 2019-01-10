import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import { MenuItem, Tooltip } from '@material-ui/core'

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
            anchorEl: null,
        })
        if (newLang !== null) {
            this.props.handleChange(newLang)
        }
    }

    render() {
        return (
            <div>
                <Tooltip title="Change coding language" placement="bottom">
                    <Button
                        variant="contained"
                        aria-owns={this.state.anchorEl ? 'menu' : undefined}
                        aria-haspopup={true}
                        onClick={this.handleClick}
                    >
                        {this.props.children}
                    </Button>
                </Tooltip>
                <Menu
                    id="menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={() => this.handleChose(null)}
                >
                    {this.props.lang.map((x, i) => (
                        <MenuItem onClick={() => this.handleChose(i)}>
                            {x.display}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}

export default LangSelection
