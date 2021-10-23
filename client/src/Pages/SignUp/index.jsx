import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import API from '../../utils/API';
import './style.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
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

    useEffect(() => {
        if (user.username) history.replace('/');
    }, [user])

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.signUp({ email: email, username: username, password: password });
            delete newUser.data.password;
            history.push('/')
            setUser(newUser.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
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
                                    value={email}
                                    onChange={handleEmail}
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
                                    value={username}
                                    onChange={handleUsername}
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
                                    value={password}
                                    onChange={handlePassword}
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
                                <Link href="/login" variant="body2">
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
