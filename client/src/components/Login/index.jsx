import React, { useState } from 'react';
import API from '../../utils/API';
import { useSnackbar } from 'notistack';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Container, Box, Typography, TextField, Grid, Link, Modal } from '@mui/material';
import './LoginModal.css'

const LoginModal = ({ setUser, show, handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === '') {
            setUsernameError(true)
            return
        } else if (password === '') {
            setPasswordError(true)
            return
        }

        try {
            const newLogin = await API.logIn({ username: username, password: password });
            delete newLogin.data.password;
            setUser(newLogin.data);
            handleClose();
            window.location.reload();
        } catch (err) {
            enqueueSnackbar('Incorrect username or password', {
                variant: 'error',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
            })
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
                                error={usernameError}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                helperText={usernameError && 'Incorrect Username/Password'}
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={e => {
                                    setUsernameError(false);
                                    setUsername(e.target.value)
                                }}
                                autoFocus
                            />
                            <TextField
                                error={passwordError}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                helperText={passwordError && 'Password is not 8 characters long / Wrong Password'}
                                type="password"
                                id="password"
                                autoComplete="password"
                                onChange={e => {
                                    setPasswordError(false);
                                    setPassword(e.target.value)
                                }}
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