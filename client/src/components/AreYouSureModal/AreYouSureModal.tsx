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


export const AreYouSureModal = ({ open, setOpen, onConfirm, title, message }: AreYouSureModalProps) => {
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
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box className="areYouSureModal">
                <Typography 
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    color="#fff">
                    {title}
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2 }} 
                    color="#fff">
                    {message}
                </Typography>
                <Button
                    variant="contained"
                    onClick={onConfirm}
                    sx={{ mt: 2, backgroundColor: 'red' }}>
                    Confirm
                </Button>
                <CloseButton />
            </Box>
        </Modal>
    );
};
