import React, { useRef, useEffect, useState } from 'react'
// import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import API from '../../utils/API';
import './style.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function SignUp({ setUser, user }) {
    const email = useRef();
    const username = useRef();
    const password = useRef();

    const history = useHistory();

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (user.username) setRedirect(true);
    }, [user])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.signUp({ email: email.current.value, username: username.current.value, password: password.current.value });
            delete newUser.data.password;
            history.push('/')
            setUser(newUser.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Container className="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className='main2'
                >
                    <Typography component="h1" variant="h5" style={{color:'black'}}>
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    ref={email}
                                    autoComplete="email"
                                    className='textField'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    ref={username}
                                    autoComplete="user-name"
                                    className='textField'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    ref={password}
                                    autoComplete="new-password"
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
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            {/* <Container className='signup-section'>
                {redirect && <Redirect to="/" />}
                <h1>Sign Up</h1>
                <form
                    onSubmit={handleSignUp}
                >
                    <div className="form-group">
                        <input
                            type='email'
                            className='form-control'
                            ref={email}
                            aria-describedby='emailHelp'
                            placeholder='Email'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type='text'
                            className='form-control'
                            ref={username}
                            placeholder='Username'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type='password'
                            className='form-control'
                            ref={password}
                            placeholder='Password'
                        />
                    </div>
                    <button
                        className='btn btn-primary btn-block'
                        type='submit'
                        onSubmit={handleSignUp}
                    >
                        Sign Up
                    </button>
                    <p className="lable-text"></p>
                    <a className="d-flex justify-content-center" href="/login"><p className="lable-text">Already have an account? Log in here!</p></a>
                </form>
            </Container> */}
        </>
    )
}

export default SignUp;
