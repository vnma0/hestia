import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import BarChart from '@material-ui/icons/BarChart';

import LocalizedMessage from 'react-l10n';

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
                <ListItemText>
                    <LocalizedMessage id='scoreboard.launcher' />
                </ListItemText>
            </>
        );
    }
}

export default ScoreboardLauncher;
