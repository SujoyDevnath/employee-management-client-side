import { Box } from '@mui/system';
import React, { useState } from 'react';
import {
    DataGrid, 
    GridToolbarDensitySelector,
    GridToolbarFilterButton, 
} from '@mui/x-data-grid';
import { Avatar, Button } from '@mui/material';
import UpdateData from '../UpdateData/UpdateData';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setTableData } from '../../Redux/actions';
import axios from 'axios';

function EditToolbar(props) {
    // const { selectedCellParams, apiRef, setSelectedCellParams } = props;

    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                justifyContent: 'space-between',
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            <Box>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <Button startIcon={<DownloadIcon />}>Export</Button>
            </Box>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto',
                    },
                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                    '& .MuiSvgIcon-root': {
                        mr: 0.5,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottom: 1,
                        borderColor: 'divider',
                    },
                }}
            />
        </Box>
    );
}

const DataTable = ({handleData }) => {
    const [selectNums, setSelectNums] = useState([]);
    const [updateID, setUpdateID] = useState(null);
    const rows = useSelector((state) => state.tableDataReducer?.data);
    const dispatch = useDispatch();

    // const array = [];
    const handleRowSelection = (e) => {
        setSelectNums(e);
    }
    // selectNums?.map(num => {
    //     const filterUser = users?.filter(user => user?.id === num);
    //     array.push(filterUser[0]);
    //     handleData('array');
    // })
    // useSelectedData(array);
        handleData(selectNums);

    
    const deleteData = (event, cellValues) => {
        const id = cellValues.row._id;
        const confirm = window.confirm('Do you want to delete?')
        if (confirm) {
            axios.delete(`http://localhost:5000/users/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        alert('deleted seccessfully');
                        const remainingUsers = rows.filter(user => user._id !== id)
                        dispatch(setTableData(remainingUsers));
                    }
                })
        }

    }

    const updateData = (event, cellValues, handleOpen) => {
        handleOpen();
        const id = cellValues.row._id;
        setUpdateID(id);
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            disableClickEventBubbling: true,
        },
        {
            field: 'photo',
            headerName: 'Profile',
            sortable: false,
            renderCell: (params) => <Avatar src={params.value} alt={params.value} />, // renderCell will render the component
        },
        { field: 'name', headerName: 'Name', width: 190, disableClickEventBubbling: true, },
        {
            field: 'phone', headerName: 'Phone Number', width: 150, disableClickEventBubbling: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 240,
            disableClickEventBubbling: true,
        },
        {
            field: 'designation',
            headerName: 'Designation',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            disableClickEventBubbling: true,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            sortable: false,
            width: 160,
            disableClickEventBubbling: true,
        },
        {
            field: 'joinedDate',
            headerName: 'Joined Date',
            sortable: false,
            width: 160,
            disableClickEventBubbling: true,
        },
        {
            field: "Update",
            disableClickEventBubbling: true,
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={(event) => {
                            updateData(event, cellValues, handleOpen);
                        }}
                    >
                        Update
                    </Button>
                );
            }
        },
        {
            field: "Delete",
            disableClickEventBubbling: true,
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={(event) => {
                            deleteData(event, cellValues);
                        }}
                    >
                        Delete
                    </Button>
                );
            }
        }
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>

            <Box sx={{ height: 500, width: '100%', my: 5, mx: 'auto' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    // onSelectionModelChange={handleRowSelection}
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = rows.filter((row) =>
                            selectedIDs.has(row.id),
                        );

                        // setSelectedRows(selectedRows);
                        console.log('selectedRows', selectedRows)
                    }}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                />
            </Box>
            <UpdateData
                open={open}
                handleClose={handleClose}
                updateID={updateID}
            >
            </UpdateData>
        </>
    );
};

export default DataTable;