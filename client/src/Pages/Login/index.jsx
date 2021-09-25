import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import API from '../../utils/API';
import './style.css'

function Login({ setUser, user }) {
    const username = useRef();
    const password = useRef();

    const history = useHistory();

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (user.username) setRedirect(true)
    }, [user])

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const newLogin = await API.logIn({ username: username.current.value, password: password.current.value });
            // delete the password so it won't be set in the state
            delete newLogin.data.password;
            setUser(newLogin.data);
            console.log(newLogin.data)
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Container className='login-section'>
                {redirect && <Redirect to="/" />}
                <h1>Login</h1>
                <form
                    onSubmit={handleLogIn}
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
                        onSubmit={handleLogIn}
                    >
                        Login
                    </button>
                    <p className="lable-text"></p>
                    <a className="d-flex justify-content-center" href="/signup"><p className="lable-text">Don't have an account? Sign up here!</p></a>
                </form>
            </Container>
        </div>
    )
}

export default Login
