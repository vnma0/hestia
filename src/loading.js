import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './loading.css';

export default class Loading extends React.PureComponent {
    render() {
        return (
            <div style={{ paddingTop: '15%' }} align='center' className='loading-page fullscreen'>
                <div style={{ marginBottom: 10 }}>
                    <CircularProgress />
                </div>
                <br />
                {this.props.children}
            </div>
        );
    }
}
