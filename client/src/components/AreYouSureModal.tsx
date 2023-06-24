import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dispatch, SetStateAction } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type AreYouSureModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onConfirm: () => void;
    title: string;
    message: string;
};

export const AreYouSureModal = ({ open, setOpen, onConfirm, title, message }: AreYouSureModalProps) => {
    const handleClose = () => setOpen(false);


    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {message}
                </Typography>
                <Button variant="contained" onClick={onConfirm} sx={{ mt: 2 }}>
                    Confirm
                </Button>
            </Box>
        </Modal>
    );
};