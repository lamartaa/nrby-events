import * as React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

// interface IGenericDisplayTrueFalseIconCellProps{
//     isTrue: boolean,
//     removeTextAlign?: boolean,
//     title: string
// }

export class GenericDisplayTrueFalseIconCell extends React.Component {

    render() {
        return (
            <td>
                {this.props.title != "" && <div className="genericDisplayCellTitle">
                    {this.props.title}:
                </div>}
                <div className="genericDisplayCellContent">
                    {this.props.isTrue ? 
                    <div style={this.props.removeTextAlign == true ? { width: "100%", color: "limegreen"} : {width: "100%", textAlign: "center", color: "limegreen"}  }><CheckCircleOutlineIcon /></div> 
                    : <div style={this.props.removeTextAlign == true ? { width: "100%", color: "red"} : {width: "100%", textAlign: "center", color: "red"}} ><CancelOutlinedIcon /> </div>}
                </div>
            </td>
        );
    }
}