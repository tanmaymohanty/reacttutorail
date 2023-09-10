import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setUserInfo } from '../../store/slice/userSlice'

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .get('http://localhost:3001/employees')
          .then((response) => {
            const employee = response.data.find(
              (emp) => emp.email === email && emp.password === password
            );
    
            if (employee) {
              localStorage.setItem('employee', JSON.stringify(employee));
              dispatch(setUserInfo(employee));  // Dispatch the action to set the user information
              navigate('/home');
            } else {
              setError('Invalid credentials.');
            }
          })
          .catch((err) => {
            setError('An error occurred. Please try again.');
          });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 15 }} noValidate>
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(e) => setEmail(e.target.value)} />
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 15 }}>
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;