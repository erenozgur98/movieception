import React, { useRef } from 'react'
import { Container } from 'react-bootstrap';
// import { Redirect } from 'react-router';
import API from '../../utils/API';

function SignUp() {
    const email = useRef();
    const username = useRef();
    const password = useRef();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const newUser = await API.signUp({ email: email.current.value, username: username.current.value, password: password.current.value });
        console.log(newUser);
    }

    return (
        <>
            <Container className='signup-section'>
                <h1>Sign Up</h1>
                <form
                    onSubmit={handleSignUp}
                >
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type='email'
                            className='form-control'
                            ref={email}
                            aria-describedby='emailHelp'
                            placeholder='Email'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type='text'
                            className='form-control'
                            ref={username}
                            placeholder='Username'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type='password'
                            className='form-control'
                            ref={password}
                            placeholder='Password'
                        />
                    </div>
                    <button
                        className='btn'
                        type='submit'
                        onSubmit={handleSignUp}
                    >
                        Sign Up
                    </button>
                </form>
            </Container>
        </>
    )
}

export default SignUp
