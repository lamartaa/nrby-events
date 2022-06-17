import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

// interface ICheckboxGridCellProps{
//     dataIndex: number,
//     checked: boolean,
//     onClick: (dataIndex: number) => void;
// }

export class CheckboxGridCell extends React.Component {

    render() {
        return (
            <td style={{textAlign: "center"}}>
                <Checkbox color="default" checked={this.props.checked} onClick={() => this.props.onClick(this.props.dataIndex)} />
            </td>
        );
    }
}