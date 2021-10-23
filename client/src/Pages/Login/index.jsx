import React, { useRef } from 'react'
// import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API from '../../utils/API';
import './style.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Login({ setUser, user }) {
    const username = useRef();
    const password = useRef();
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const newLogin = await API.logIn({ username: username.current.value, password: password.current.value });
            delete newLogin.data.password;
            setUser(newLogin.data);
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    // export function useTitle(title) {
    //     useEffect(() => {
    //       const prevTitle = document.title
    //       document.title = title
    //       return () => {
    //         document.title = prevTitle
    //       }
    //     })
    //   }

    // const MyComponent = () => {
    //     useTitle("New Title")
    //     return (
    //       <div>
    //        ...
    //       </div>
    //     )
    //   }

    return (
        <div>
            <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
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
              ref={username}
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
              autoComplete="current-password"
              ref={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
            {/* <Container className='login-section'>
                <h1>Login</h1>
                <form
                    onSubmit={handleLogin}
                >
                    <div className='form-group'>
                        <input
                            type='username'
                            className='form-control'
                            ref={username}
                            placeholder='Username'
                        />
                    </div>
                    <div className='form-group'>
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
                        onSubmit={handleLogin}
                    >
                        Login
                    </button>
                    <p className="lable-text"></p>
                    <a className="d-flex justify-content-center" href="/signup"><p className="lable-text">Don't have an account? Sign up here!</p></a>
                </form>
            </Container> */}
            {/* <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" name='username' ref={username} />
                <label htmlFor="password">Password</label>
                <input type="password" name='password' ref={password} />
                <button className='' type='submit'>Login</button>
            </form> */}
        </div>
    )
};

export default Login
