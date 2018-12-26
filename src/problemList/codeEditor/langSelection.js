import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class LangSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: 'C++',
            anchorEl: null
        };
        this.handleChoice = this.handleChoice.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.setState({ anchorEl: event.currentTarget });
    };

    handleChoice(newLang) {
        this.setState({
            lang: newLang,
            anchorEl: null
        });
    };

    render() {
        return (
            <div>
                <Button
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
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleChoice(cpp)}>C++</MenuItem>
                    <MenuItem onClick={this.handleChoice(java)}>Java</MenuItem>
                    <MenuItem onClick={this.handleChoice(python)}>Python</MenuItem>
                </Menu>
                <h1>{str}</h1>
            </div>
        );
    }
}

export default LangSelection;
