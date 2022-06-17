import * as React from 'react';

export class GenericDisplayCell extends React.Component {

    render() {
        return (
            <td>
                <div className="genericDisplayCellTitle">
                    {this.props.title}:
                </div>
                <div className="genericDisplayCellContent">
                    {this.props.value}
                </div>
            </td>
        );
    }
}