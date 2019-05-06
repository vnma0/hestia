import React from 'react';
import { Button, Tooltip, CircularProgress } from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { withNamespaces } from 'react-i18next';

class UploadButton extends React.PureComponent {
    render() {
        const { t } = this.props;
        return (
            <Tooltip title={t('problems.codeEditor.control.uploadButtonTooltip')}>
                <Button {...this.props}>
                    {this.props.disabled ? (
                        <CircularProgress size={20} />
                    ) : (
                        <CloudUpload style={{ width: 20, height: 20 }} />
                    )}
                    {/* if disabled, it means a file is being loaded */}
                </Button>
            </Tooltip>
        );
    }
}

export default withNamespaces()(UploadButton);
