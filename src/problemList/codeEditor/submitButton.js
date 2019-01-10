import React from 'react'
import Button from '@material-ui/core/Button'

/**
 * @name SubmitButton
 * Button Api: https://material-ui.com/api/button/
 * Input Api: https://material-ui.com/api/input/
 */

class SubmitButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        let element=document.createElement("a");
        let submitFile = new Blob([this.props.code], { type: 'text/plain' })
        element.href = URL.createObjectURL(submitFile);
        element.download = this.props.submitFileName + '.' + this.props.extension;
        element.click();
    }

    render() {
        return (
            <Button
                disabled={this.props.disabled}
                variant="contained"
                color="primary"
                style={
                    {
                        // backgroundColor: this.props.disabled ? '' : '#1af46a',
                        // color: this.props.disabled ? '' : 'white',
                    }
                }
                onClick={this.handleClick}
            >
                {this.props.children}
            </Button>
        )
    }
}

export default SubmitButton
