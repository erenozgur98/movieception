import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button, Container, Box, Typography, TextField, Grid, Link, Modal } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import API from '../../utils/API';
import './LoginModal.css'

const LoginModal = ({ setUser, show, handleClose }) => {
    // const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const newLogin = await API.logIn({ username: username, password: password });
            delete newLogin.data.password;
            setUser(newLogin.data);
            handleClose();
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <Modal open={show} onClose={handleClose}>
            <ThemeProvider theme={darkTheme}>
                <Container className="login-main" maxWidth="xs">
                    <Box className='login-main-2'>
                        <Typography component="h1" variant="h5">
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
            </ThemeProvider>
        </Modal>
    )
}

export default LoginModal