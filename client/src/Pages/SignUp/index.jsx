import React, { useRef, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import API from '../../utils/API';
import './style.css';

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
            <Container className='signup-section'>
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
            </Container>
        </>
    )
}

export default SignUp;
