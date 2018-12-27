import React from 'react';
import { Grid } from '@material-ui/core';
import ProblemTab from './problemTab';
import PropTypes from 'prop-types';
import CodeEditor from '../codeEditor/codeEditor';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class ProblemTabEditor extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <ProblemTab />
                    <CodeEditor />
                </Grid>
            </div>
        )
    }
}

ProblemTabEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProblemTabEditor);