import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import API from '../../utils/API';
import './style.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function SignUp({ setUser, user }) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        if (user.username) history.replace('/');
    }, [user])

    const handleEmail = e => {
        setEmailError(false)
        setEmail(e.target.value)
    }

    const handleUsername = e => {
        setUsernameError(false)
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPasswordError(false)
        setPassword(e.target.value)
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (email === '') {
            setEmailError(true)
            return
        } else if (username === '') {
            setUsernameError(true)
            return
        } else if (password === '' || password.length < 8) {
            setPasswordError(true)
            return
        }

        try {
            if (email.match(mailFormat)) {
                const newUser = await API.signUp({ email: email, username: username, password: password })
                delete newUser.data.password;
                window.location.assign('/');
                setUser(newUser.data);
            } else {
                setEmailError(true)
            }
        } catch (err) {
            enqueueSnackbar('Something went wrong, please try again!', {
                variant: 'error',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
            })
        }
    }

    return (
        <>
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={emailError}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    helperText={emailError && 'Email must contain @ and .com'}
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmail}
                                    className='textField'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={usernameError}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    helperText={usernameError && 'Username is either taken or not valid'}
                                    type="username"
                                    name="username"
                                    value={username}
                                    onChange={handleUsername}
                                    className='textField'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={passwordError}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    helperText={passwordError && 'Password must be 8 characters long / Wrong Password'}
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePassword}
                                    className='textField'
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default SignUp;
