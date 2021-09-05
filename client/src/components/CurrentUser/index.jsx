import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap'

function CurrentUser({ user }) {
    const [currentUser, setCurrentUser] = useState({});
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        if (user) setCurrentUser(user.username)
    }, [user]);

    useEffect(() => {
        const setTime = async () => {
            let time = new Date();
            let hours = time.getHours();

            if (hours < 12) {
                setGreeting('morning');
            } else if (hours >= 12 && hours <= 17) {
                setGreeting('afternoon');
            } else {
                setGreeting('evening');
            }
        }
        setTime();
    }, []);

    return (
        <div>
            <Container className="d-flex justify-content-center">
                <div>
                    {currentUser ? (
                        `Good ${greeting}, ${currentUser}!`
                    ) : (
                        `Good ${greeting}!`
                    )}
                </div>
            </Container>
        </div>
    )
}

export default CurrentUser;

