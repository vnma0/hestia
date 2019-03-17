import React from 'react';
import { Chip } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Cancel';

import './build.css'

export default class BuildTag extends React.PureComponent {
    render() {
        return (
            <Chip onDelete={() => {}} clickable={false}
                className={`chip-${process.env.NODE_ENV}`}
                label={process.env.NODE_ENV === 'production' 
                    ? "Production build" : "Development build"}
                deleteIcon={process.env.NODE_ENV === 'production' 
                    ? <Done style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />
                }/>
        )
    }
}