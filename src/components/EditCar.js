import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material';
import DialogContent from '@mui/material';
import DialogTitle from '@mui/material';

function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        fuel: '',
        price: ''
    });

    // Open the modal form
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setCar({...car,
        [event.target.name]: event.target.value});
    }
    // Update car and close modal form
    const handleSave = () => {
        return(
            <div></div>
        );
    }
}
export default EditCar;