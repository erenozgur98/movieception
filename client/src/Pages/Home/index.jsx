import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap'

function Home({ user }) {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (user) setCurrentUser(user.username)
    }, [user]);

    return (
        <div>
            {/* <Banner /> */}
            {/* add this to header/nav instead of homepage */}
            <Container className="d-flex justify-content-center">
                <div>
                    {currentUser ? (
                        `Hello, ${currentUser}!`
                    ) : (
                        <p>You can login from <a href='/login'>here</a></p>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Home

