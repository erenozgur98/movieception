import React, { useRef } from 'react'
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API from '../../utils/API';
import './style.css'

function Login({ setUser, user }) {
    const username = useRef();
    const password = useRef();
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const newLogin = await API.logIn({ username: username.current.value, password: password.current.value });
            delete newLogin.data.password;
            // commenting out for now, seems like app.js sets the user via useEffect
            // gota find why it's not refreshing
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
            <Container className='login-section'>
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
            </Container>
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
