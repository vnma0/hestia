import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import Description from '@material-ui/icons/Assignment';
import { withNamespaces } from 'react-i18next';

/**
 * @name ProblemLauncher
 * @description Element to be rendered in the sidenav, responsible for launching submission table
 */

class ProblemLauncher extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <>
                <ListItemIcon>
                    <Description />
                </ListItemIcon>
                <ListItemText>{t('problems.launcher')}</ListItemText>
            </>
        );
    }
}

export default withNamespaces()(ProblemLauncher);
