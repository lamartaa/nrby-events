import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

// interface IGenericErrorModalProps{
//     hidden: boolean,
//     message: string,
//     closeModal: () => void
// }

export class GenericErrorModal extends React.Component {


    render() {
        return (
            <div>
               <Dialog
                    onClose={this.props.closeModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.hidden == false}
                    className="genericErrorModal"
                >
                    <DialogTitle disableTypography className='dialog-title-danger'>
                        <Typography variant="h6">Error</Typography>
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