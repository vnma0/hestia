import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class LangSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            str: 'C++',
            anchorEl: null
        };
        this.handleChose = this.handleChose.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose(){
        this.setState({ anchorEl: null });
    };

    handleChose() {
        this.setState({
            str: this.props.lang[1],
            anchorEl: null
        });
    };

    render() {
        const { anchorEl, str } = this.state;
        const { lang } = this.props;
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Change Language...
        </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {lang.map((x, i) => <MenuItem onClick={this.handleChose}>{x}</MenuItem>)}
                </Menu>
                <h1>{str}</h1>
            </div>
        );
    }
}

LangSelection.defaultProps = { lang: ['C++', 'JavaScript'] };

export default LangSelection;
