import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
// import DownloadButton from './downloadButton'

/**
 * @name ProblemTab
 * @description Tabs for displaying problems
 * @param {Array [ Object { String, String, String } ]} problems: id of the problem ([id, statement, link])
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

class ProblemTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0, //Current tab
        }
    }
    //Handle change
    handleChange = (event, value) => {
        this.props.handleTabChange(value)
    }
    //render
    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.props.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {this.props.problem.map((x,index) => (
                            <Tab label={x} key={index}/>
                        ))}
                    </Tabs>
                    <TabContainer>
                        {this.props.problem[this.props.value]
                            ? this.props.problem[this.props.value].statement
                            : ''}
                    </TabContainer>
                </AppBar>
            </div>
        )
    }
}

export default ProblemTab
