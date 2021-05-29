import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import API from '../../utils/API';

function SignUp() {

    const handleSignUp = async (e) => {
        e.preventDefault();
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
                            id='exampleInputEmail'
                            aria-describedby='emailHelp'
                            placeholder='Email'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type='text'
                            className='form-control'
                            id='exampleInputUserName'
                            placeholder='Username'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type='password'
                            className='form-control'
                            id='exampleInputPassword'
                            placeholder='Password'
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
