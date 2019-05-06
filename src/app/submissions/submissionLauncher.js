import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import DoneAll from '@material-ui/icons/CheckCircleOutline';
import { withNamespaces } from 'react-i18next';

/**
 * @name SubmissionLauncher
 * @description Element to be rendered in the sidenav, responsible for launching submission table
 */

class SubmissionLauncher extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <>
                <ListItemIcon>
                    <DoneAll />
                </ListItemIcon>
                <ListItemText>{t('submissions.launcher')}</ListItemText>
            </>
        );
    }
}

export default withNamespaces()(SubmissionLauncher);
