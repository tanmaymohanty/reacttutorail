import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserInfo } from '../../store/slice/userSlice';
const Header = () => {
    const dispatch = useDispatch();
    const { username } = JSON.parse(localStorage.getItem('employee'));
    const [status, setStatus] = useState('');
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setStatus(selectedValue);
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        // Remove the user data from local storage
        localStorage.removeItem('employee');
        // Remove the user data from Redux store
        dispatch(clearUserInfo());
        navigate('/login');
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: 'rgb(77 204 111)' }}>
            <div>
                <img src=".\assets\hmlogo.png" alt="HM Logo" style={{ width: '200px' }} />
                <FormControl variant="filled" style={{ minWidth: 170, marginLeft: '15px' }}>
                    <InputLabel htmlFor="pool-emp-status" style={{ color: '#fff' }}>Pool Emp Status</InputLabel>
                    <Select
                        value={status}
                        onChange={handleChange}
                        label="Pool Emp Status"
                        id="pool-emp-status"
                    >
                        <MenuItem value="In pool">In pool</MenuItem>
                        <MenuItem value="Assigned project">Assigned project</MenuItem>
                        <MenuItem value="Doing Poc">Doing Poc</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <img src="\assets\profile.png" alt="Profile Icon" style={{ width: '30px' }} />
                    <span>{username}</span>
                    <Button variant='contained' color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;