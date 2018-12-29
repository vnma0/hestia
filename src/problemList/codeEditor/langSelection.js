import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class LangSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLang: "cpp",
            anchorEl: null
        };
        this.handleChoice = this.handleChoice.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    
    handleChoice(newLang) {
        this.setState({
            currentLang: newLang?newLang:this.state.lang,
            anchorEl: null
        });
    };

    render() {
        const {lang} = this.props;
        const {currentLang} = this.state;
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
                    onClose={() => this.handleChoice(null)}
                >
                    {lang.map((x) => <MenuItem onClick={() => this.handleChoice(x)}>{x}</MenuItem>)}
                </Menu>
                <h2>{currentLang}</h2>
            </div>
        );
    }
}

LangSelection.defaultProps = { lang : ["cpp","java","python"] };

export default LangSelection;
