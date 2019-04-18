import React from 'react';
import { TablePagination } from '@material-ui/core';

/**
 * @name Paginator
 * @desc Pagination navigation panel
 * @param {Number} `colSpan` - Columns to span.
 */

class Paginator extends React.Component {
    render() {
        return <TablePagination {...this.props} />;
    }
}

export default Paginator;
