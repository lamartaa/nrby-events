import * as React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

// interface ITableFilterToggleButtonProps{
//     expanded: boolean,
//     onClick: () => void;
// }

export class TableFilterToggleButton extends React.Component {

    render() {
        return (
            <div>
                <Button className="btn-filter-toggle" onClick={this.props.onClick} style={{width: "100%", marginBottom: "10px"}}>{this.props.expanded ? <table className="filter-button-table"><tr><td>Hide Filters</td><td><ExpandLessIcon fontSize="large"/></td></tr></table> : <table className="filter-button-table"><tr><td>Show Filters</td><td><ExpandMoreIcon fontSize="large"/></td></tr></table>}</Button>
            </div>
        );
    }
}