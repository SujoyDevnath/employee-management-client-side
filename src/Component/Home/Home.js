import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AddNewData from '../AddNewData/AddNewData';
import DataTable from '../DataTable/DataTable';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { setTableData } from '../../Redux/actions';
import axios from 'axios';
// import useSelectedData from '../../Hooks/useSelectedData';

const Home = () => {
    const rows = useSelector((state) => state.tableDataReducer?.data)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [users, setUsers] = useState([]);
    const [selectedRowNum, setSelectedRowNum] = useState([])

    // const array = [];

    // selectedRowNum?.map(num => {
    //     const filterUser = rows?.filter(row => row?.id === num);
    //     array.push(filterUser[0]);
    // })
    // console.log(array);

    const fetchProducts = async () => {
        const response = await axios
            .get("http://localhost:5000/users")
            .catch((err) => {
                console.error("Err: ", err);
            });
        dispatch(setTableData(response.data));
    };
    useEffect(() => {
        fetchProducts();
    }, [rows]);

    const handleData = (e) => {
        console.log('from function', e);
        setSelectedRowNum(e);
    };
    // useEffect(() => {
    //     const emailData = handleData();
    // }, [handleData]);

    return (
        <Box>
            <DataTable handleData={handleData}></DataTable>
            <Box sx={{ height: '100%', width: '100%', my: 5, mx: 'auto', }}>
                <Box className="">
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            bgcolor: 'background.paper',
                            maxWidth: 300,
                        }}
                    >
                        <Button variant="contained" sx={{ m: '5px' }} endIcon={<SendIcon />}>
                            Send
                        </Button>
                        <Button onClick={handleOpen} variant="contained" sx={{ m: '5px' }} color="success">
                            Add New Data
                        </Button>

                    </Box>
                </Box>
            </Box>
            <AddNewData
                open={open}
                handleClose={handleClose}
                users={users}
            ></AddNewData>
        </Box>
    );
};

export default Home;