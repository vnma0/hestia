import React from 'react';
import { withNamespaces } from 'react-i18next';
import Feedback from '@material-ui/icons/FeedbackOutlined';

class LoggedOut extends React.Component {
    render() {
        return (
            <div
                align='center'
                style={{
                    marginTop: '10%'
                }}>
                <Feedback fontSize='large' />
                <br />
                {this.props.t('global.loggedOut')}
            </div>
        );
    }
}

export default withNamespaces()(LoggedOut);
