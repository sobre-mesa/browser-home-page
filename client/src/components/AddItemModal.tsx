import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type BasicModalProps =  {
    open: boolean,
    setOpen: (isOpen: boolean) => any,
    categoryId: string, handleSubmit: (name: string, categoryId: string,
    url: string, image: string) => any
}

export default function BasicModal({open, setOpen, categoryId, handleSubmit} : BasicModalProps){
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [image, setImage] = React.useState('');
    const handleClose = () => setOpen(false);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(name, categoryId, url, image);
        handleClose();
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new item to category
                </Typography>
                <form onSubmit={onSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        URL:
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Image:
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </Box>
        </Modal>
    );
}