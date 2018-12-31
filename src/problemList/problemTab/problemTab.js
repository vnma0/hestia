import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import DownloadButton from './downloadButton'

/**
 * @name ProblemTab
 * @description Tabs for displaying problems
 * @param {Object[string]} pId: id of the problem
 * @param {Object[string]} pStatement: The problem's statement
 * @author Who_cares?
 * Tabs Api: https://material-ui.com/api/tabs/
 */

//The tab container
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    )
}
//Still don't understand this :/
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
}
//Style options of the tabs
const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
})
class ProblemTab extends React.Component {
    state = {
        value: 0, //Current tab
    }
    //Handle change
    handleChange = (event, value) => {
        this.setState({ value })
    }
    //render
    render() {
        const { pId, pStatement, classes } = this.props
        const { value } = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {pId.map(x => (
                            <Tab label={x} />
                        ))}
                    </Tabs>
                </AppBar>
                {pStatement.map(
                    (x, i) =>
                        value === i && (
                            <TabContainer id={'Tab ' + i}>{x}</TabContainer>
                        )
                )}
                <DownloadButton>Download statement file</DownloadButton>
            </div>
        )
    }
}

ProblemTab.propTypes = {
    classes: PropTypes.object.isRequired,
}

ProblemTab.defaultProps = {
    pId: ['A', 'B', 'C', 'D', 'E'],
    pStatement: [
        'No preview available',
        'No preview available',
        'No preview available',
        'No preview available',
        'No preview available',
    ],
}

export default withStyles(styles)(ProblemTab)
