import React from 'react';
import LocalizedMessage from 'react-l10n';
import Feedback from '@material-ui/icons/FeedbackOutlined';

export default class LoggedOut extends React.Component {
    render() {
        return (
            <div
                align='center'
                style={{
                    marginTop: '10%'
                }}>
                <Feedback fontSize='large' />
                <br />
                <LocalizedMessage id='global.loggedOut' />
            </div>
        );
    }
}
