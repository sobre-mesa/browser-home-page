import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import './AreYouSureModal.css';

type AreYouSureModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  title: string;
  message: string;
};


const AreYouSureModal = ({ open, setOpen, onConfirm, title, message }: AreYouSureModalProps) => {
    const handleClose = () => setOpen(false);
    const CloseButton = () => {
        return (
            <div className="closeButton"
                onClick={handleClose}>
                X
            </div>
        );
    };
    return (
        <Modal 
            className="modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box className="areYouSureModal">
                <Typography 
                    color="#fff"
                    component="h2"
                    id="modal-modal-title"
                    variant="h6">
                    {title}
                </Typography>
                <Typography
                    color="#fff"
                    id="modal-modal-description"
                    sx={{ mt: 2 }} >
                    {message}
                </Typography>
                <Button
                    onClick={onConfirm}
                    sx={{ mt: 2, backgroundColor: 'red' }}
                    variant="contained">
                    Confirm
                </Button>
                <CloseButton />
            </Box>
        </Modal>
    );
};

export default AreYouSureModal;