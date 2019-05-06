import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import { withNamespaces } from 'react-i18next';

/**
 * @name HomepageLauncher
 * @description Element to be rendered in the sidenav, responsible for launching home page
 */

class HomepageLauncher extends React.Component {
    render() {
        return (
            <>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText>{this.props.t('homepage.launcher')}</ListItemText>
            </>
        );
    }
}

export default withNamespaces()(HomepageLauncher);
