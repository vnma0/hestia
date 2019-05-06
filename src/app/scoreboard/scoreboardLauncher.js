import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import BarChart from '@material-ui/icons/BarChart';
import { withNamespaces } from 'react-i18next';

/**
 * @name ScoreboardLauncher
 * @description Element to be rendered in the sidenav, responsible for launching scoreboard table
 */

class ScoreboardLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <BarChart />
                </ListItemIcon>
                <ListItemText>{this.props.t('scoreboard.launcher')}</ListItemText>
            </>
        );
    }
}

export default withNamespaces()(ScoreboardLauncher);
