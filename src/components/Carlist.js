import React, { useEffect, useState } from "react";
import { SERVER_URL } from '../constants.js'
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar.js";

function Carlist() {
    const [cars, setCars] = useState([]);
    const columns = [
        {field: 'brand', headerName: 'Brand', width: 100},
        {field: 'model', headerName: 'Model', width: 100},
        {field: 'color', headerName: 'Color', width: 100},
        {field: 'year', headerName: 'Year', width: 100},
        {field: 'price', headerName: 'Price', width: 100},
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
            <button
                onClick={ () => onDelClick(row.id)}>Delete
                </button>
    }
    ]
    useEffect( () => {
        fetchCars();
    }, []);
    const fetchCars = () => {
        fetch(SERVER_URL + 'api/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
    }
    const onDelClick = (url) => {
        if (window.confirm("Are you sure to delete?")) {
        fetch(url, {method: 'DELETE'})
        .then(response => {
            if (response.ok) {
            fetchCars();
            setOpen(true);
            }
            else {
                alert('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
    }
}
    const [open, setOpen] = useState(false);
    const addCar = (car) => {
        fetch(SERVER_URL + 'api/cars',
        {
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(car)
        })
        .then( response => {
            if (response.ok) {
                fetchCars();
            }
            else {
                alert('Something went wrong!');
            }
            })
            .catch( err => console.error(err));
        }
    return (
        <React.Fragment>
            <AddCar addCar={addCar} />
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={cars}
                columns={columns}
                disableSelectionOnClick={true}
                getRowId={ row => row._links.self.href}/>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={ () => setOpen(false)}
                message="Car deleted"
                />
        </div>
        </React.Fragment>
    );
}
export default Carlist;