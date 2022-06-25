import React from "react";
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

function NotLoggedIn() {

    const StyledMainContainer = styled(Container)`
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 5rem;
        border-radius: 25px;
        text-align: center;
    `

    const StyledH2 = styled.h2`
        color: rgba(0, 0, 0, 1);
    `

    return (
        <StyledMainContainer>
            <StyledH2>You are not logged in, to log in you can click <a href='/login'>here</a></StyledH2>
        </StyledMainContainer>
    )
}

export default NotLoggedIn;
