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
    bgcolor:  'rgba(0, 0, 0, 0.8)',
    borderRadius: 5,
    p: 4,
};

const closeButtonStyle = {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
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
                <Typography id="modal-modal-title" variant="h6" component="h2" color="#fff">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} color="#fff">
                    {message}
                </Typography>
                <Button variant="contained" onClick={onConfirm} sx={{ mt: 2, backgroundColor: 'red' }}>
          Confirm
                    <span style={{ marginLeft: '0.5rem', color: '#000' }}>X</span>
                </Button>
                <div style={closeButtonStyle} onClick={handleClose}>
          X
                </div>
            </Box>
        </Modal>
    );
};
