import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

// interface IGenericConfirmationModalProps{
//     hidden: boolean,
//     message: string,
//     confirmButtonText: string,
//     cancelButtonText: string,
//     closeModal: () => void,
//     onConfirm: () => void,
// }

export class GenericConfirmationModal extends React.Component {

    render() {
        return (
            <div>
                <Dialog
                    onClose={this.props.closeModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="genericConfirmationModal"
                    open={this.props.hidden == false}
                >
                    <DialogTitle disableTypography className='dialog-title-warning'>
                        <Typography variant="h6">Confirmation</Typography>
                        <IconButton aria-label="close"
                            className='close-button'
                            onClick={this.props.closeModal}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        {this.props.message}
                    </DialogContent>
                    <DialogActions disableSpacing={true}>
                        <Button onClick={this.props.closeModal} className='action-button'>
                            {this.props.cancelButtonText}
                        </Button>
                        <Button onClick={this.props.onConfirm} className='action-button'>
                            {this.props.confirmButtonText}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}