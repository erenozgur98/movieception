import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Button, Container, Box, Typography, TextField, Grid, Link } from '@mui/material';
import API from '../../utils/API';

const LoginModal = ({ setUser, show, handleClose }) => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const newLogin = await API.logIn({ username: username, password: password });
            delete newLogin.data.password;
            setUser(newLogin.data);
            handleClose();
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Container className="signup-main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className='signup-main2'
                >
                    <Typography component="h1" variant="h5" style={{ color: 'black' }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoFocus
                            />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onSubmit={handleLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Modal>
    )
}

export default LoginModal