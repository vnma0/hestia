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
 * @param {Array : Object[String, String, String]} problems: id of the problem ([id, statement, link])
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
    constructor(props) {
        super(props)
        this.state = {
            value: 0, //Current tab
        }
    }
    //Handle change
    handleChange = (event, value) => {
        this.setState({ value })
    }
    //render
    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {this.props.problems.map(x => (
                            <Tab label={x.id} />
                        ))}
                    </Tabs>
                    <TabContainer>
                        {this.props.problems[this.state.value].statement}
                    </TabContainer>
                    <DownloadButton
                        link={this.props.problems[this.state.value].link}
                    >
                        Download
                    </DownloadButton>
                </AppBar>
            </div>
        )
    }
}

ProblemTab.propTypes = {
    classes: PropTypes.object.isRequired,
}

ProblemTab.defaultProps = {
    problems: [
        { id: 'A', statement: 'To Google', link: 'https://www.google.com.vn/' },
        { id: 'B', statement: 'To GitHub', link: 'https://github.com/' },
    ],
}

export default withStyles(styles)(ProblemTab)
