import React, { useEffect, useState } from "react";
import { SERVER_URL } from '../constants.js'
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar.js";
import EditCar from "./EditCar.js";
import { GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"

function Carlist() {
    // contains cars received from backend
    const [cars, setCars] = useState([]);

    // the open/closed state of the modal edit dialogue
    const [open, setOpen] = useState(false);

    // table with car details, edit & delete button in every row
    const columns = [
        { field: 'brand', headerName: 'Brand', width: 100 },
        { field: 'model', headerName: 'Model', width: 100 },
        { field: 'color', headerName: 'Color', width: 100 },
        { field: 'year', headerName: 'Year', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: '_links.car.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <EditCar
                    data={row}
                    updateCar={updateCar} />
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <IconButton onClick={() => onDelClick(row.id)}>
                    <DeleteIcon color="error" />
                </IconButton>
        }
    ]

    // this is called after every render
    useEffect(() => {
        fetchCars();
    }, []);

    // method to fetch cars
    const fetchCars = () => {
        // Read the token from session storage and include in Authorization header
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars', {
            headers: { 'Authorization' : token }
        })
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err));
    }

    // handle delete 
    const onDelClick = (url) => {
        if (window.confirm("Are you sure to delete?")) {
            const token = sessionStorage.getItem("jwt");
            fetch(url, {
                method: 'DELETE',
                headers: { Authorization : token} })
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

    // add a car
    const addCar = (car) => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(car)
            })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                }
                else {
                    alert('Something went wrong!');
                }
            })
            .catch(err => console.error(err));
    }

    // update car
    const updateCar = (car, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                }
                else {
                    alert('Something went wrong!');
                }
            })
            .catch(err => console.error(err))
    }

    // The export function including button with icon
    function CustomToolbar() {
        return (
            <GridToolbarContainer
                className={gridClasses.toolbarContainer}>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }
    
    return (
        <React.Fragment>
            <Stack mt={2} mb={2}>
                <AddCar addCar={addCar} />
            </Stack>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={cars}
                    columns={columns}
                    disableSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                    components={{ Toolbar: CustomToolbar }}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Car deleted"
                />
            </div>
        </React.Fragment>
    );
}
export default Carlist;