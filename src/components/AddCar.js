import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material"
import { DialogContent } from "@mui/material"
import { DialogTitle } from "@mui/material"

function AddCar(props) {
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
    const handleClickOpen = () => {
        setOpen(true);
    }
    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange = (event) => {
        setCar( {...car, [event.target.name]:
        event.target.value});
    }
    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }
    return (
        <div>
            <button onClick={handleClickOpen}>New Car</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <DialogContent>
                    <input placeholder="Brand" name="brand"
                    value={car.brand} onChange={handleChange}
                    /><br/>
                    <input placeholder="Model" name="model"
                    value={car.model} onChange={handleChange}
                    /><br/>
                    <input placeholder="Color" name="color"
                    value={car.color} onChange={handleChange}
                    /><br/>
                    <input placeholder="Year" name="year"
                    value={car.year} onChange={handleChange}
                    /><br/>
                    <input placeholder="Price" name="price"
                    value={car.price}  onChange={handleChange}
                    /><br/>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddCar;