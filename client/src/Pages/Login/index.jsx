import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import API from '../../utils/API';
import './style.css'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Login({ user, setUser }) {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (user.username) history.replace('/')
    }, [user])

    const handleUsername = e => {
        setUsernameError(false)
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPasswordError(false)
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === '') {
            setUsernameError(true)
            return
        } else if (password === '' || password.length < 8) {
            setPasswordError(true)
            return
        }

        try {
            const newLogin = await API.logIn({ username: username, password: password });
            delete newLogin.data.password;
            setUser(newLogin.data);
            window.location.assign('/');
        } catch (err) {
            enqueueSnackbar('Something went wrong, please try again!', {
                variant: 'error',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
            })
        }
    }

    return (
        <div>
            <Container className="signup-main" maxWidth="xs">
                <CssBaseline />
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
                            error={usernameError}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            helperText={usernameError && 'Username is either taken or not valid'}
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={handleUsername}
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
                            onChange={handlePassword}
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
        </div >
    )
};

export default Login
