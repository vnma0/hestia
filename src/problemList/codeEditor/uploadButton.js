import React from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

/**
 * @name UploadButton
 * @description The upload button, currently not working
 */

class UploadButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        let file = e.target.files
        let reader = new FileReader()
        if (file[0] === undefined) return
        reader.readAsText(file[0])
        reader.onload = e => {
            this.props.sendFile(String(e.target.result), String(file[0].name))
        }
    }
    //render
    render() {
        return (
            <>
                <Tooltip title="Upload local file">
                    <Button component="label" variant="contained">
                        {this.props.children}
                        <input
                            type="file"
                            id="upload"
                            style={{ display: 'none' }}
                            onChange={e => this.handleChange(e)}
                        />
                    </Button>
                </Tooltip>
            </>
        )
    }
}

export default UploadButton
