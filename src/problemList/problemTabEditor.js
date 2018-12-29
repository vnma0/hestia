import React from 'react';
import { Grid } from '@material-ui/core';
import ProblemTab from './problemTab/problemTab';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CodeBox from './codeEditor/codeBox';

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
                <Grid container spacing={8} alignItems="flex-start">
                    <Grid item style={{
                        width: "50%",
                    }}>
                        <ProblemTab />
                    </Grid>
                    <Grid item style={{
                        width: "50%",
                    }}>
                        <CodeBox />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

ProblemTabEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProblemTabEditor);