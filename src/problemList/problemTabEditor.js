import React from 'react'
import { Grid } from '@material-ui/core'
import ProblemTab from './problemTab/problemTab'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CodeBox from './codeEditor/codeBox'

/**
 * @author Dat Ngo
 * @description Combine all components
 * @param {Array[ Object {id,name,statement,link} ]} problem problem ID, problem name, statement, download link
 */

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})

class ProblemTabEditor extends React.Component {
    constructor(props){
        super(props);
        this.state={
            currentTab: 0,
        }
        this.handleTabChange=this.handleTabChange.bind(this);
    }
    handleTabChange(value){
        this.setState({
            currentTab: value
        })    
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root} style={{ marginTop: '10px' }}>
                <Grid container spacing={8} alignItems="flex-start">
                    <Grid
                        item
                        style={{
                            width: '50%',
                        }}
                    >
                        <ProblemTab problem={this.props.problem} handleTabChange={this.handleTabChange} value={this.state.currentTab} />
                    </Grid>
                    <Grid
                        item
                        style={{
                            width: '50%',
                        }}
                    >
                        <CodeBox submitFileName={this.props.problem[this.state.currentTab].name} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

ProblemTabEditor.propTypes = {
    classes: PropTypes.object.isRequired,
}

ProblemTabEditor.defaultProps = {
    problem: [
        {
            id: 'A',
            name: 'GOOGLE',
            statement: 'To Google',
            link: 'https://www.google.com.vn/',
        },
        {
            id: 'B',
            name: 'GITHUB',
            statement: 'To GitHub',
            link: 'https://github.com/',
        },
    ],
}

export default withStyles(styles)(ProblemTabEditor)
