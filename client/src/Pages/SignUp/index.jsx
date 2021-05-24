import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import API from '../../utils/API';

function SignUp({ setUser, user }) {
    const [details, setDetails] = useState({ usename: '', email: '', password: '' })
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (user.username) setRedirect(true);
    }, [user]);

    const handleSignUp = async e => {
        e.preventDefault();
        try {
            const signedUpUser = await API.signUp(details);
            setUser(signedUpUser.data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Container className='signup-section'>
                {redirect && <Redirect to='/' />}
                <h1>Sign Up</h1>
                <form
                    onClick={handleSignUp}
                >
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail">Email Address</label>
                        <input
                            type='email'
                            className='form-control'
                            id='exampleInputEmail'
                            aria-describedby='emailHelp'
                            placeholder='Email'
                            onChange={e => setDetails({ ...details, email: e.target.value })}
                            value={details.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputUserName">Username</label>
                        <input
                            type='email'
                            className='form-control'
                            id='exampleInputUserName'
                            placeholder='Username'
                            onChange={e => setDetails({ ...details, username: e.target.value })}
                            value={details.username}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword">Password</label>
                        <input
                            type='password'
                            className='form-control'
                            id='exampleInputPassword'
                            placeholder='Password'
                            onChange={e => setDetails({ ...details, password: e.target.value })}
                            value={details.password}
                        />
                    </div>
                    <button
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
