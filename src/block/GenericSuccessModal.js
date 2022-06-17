import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
// interface IGenericSuccessModalProps{
//     hidden: boolean,
//     message: string,
//     closeModal: () => void
// }

export class GenericSuccessModal extends React.Component {


    render() {
        return (
            <div>
                <Dialog
                    onClose={this.props.closeModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="genericSuccessModal"
                    open={this.props.hidden == false}
                >
                    <DialogTitle disableTypography className='dialog-title-success'>
                        <Typography variant="h6">Success</Typography>
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
                        <Button onClick={this.props.closeModal} className='action-button-close'>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}