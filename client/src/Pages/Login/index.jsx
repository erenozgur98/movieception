import React, { useRef } from 'react'
import { Container } from 'react-bootstrap';
import API from '../../utils/API';

function Login({ setUser, user }) {
    const username = useRef();
    const password = useRef();

    const handleLogIn = async (e) => {
        e.preventDefault();
        const newLogin = await API.logIn({ username: username.current.value, password: password.current.value });
        console.log(newLogin);
    }

    return (
        <div>
            <Container className='login-section'>
                <h1>Login</h1>
                <form
                    onSubmit={handleLogIn}
                >
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='username'
                            className='form-control'
                            ref={username}
                            placeholder='Username'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            ref={password}
                            placeholder='password'
                        />
                    </div>
                    <button
                        className='btn'
                        type='submit'
                        onSubmit={handleLogIn}
                    >
                        Login
                    </button>
                </form>
            </Container>
        </div>
    )
}

export default Login
