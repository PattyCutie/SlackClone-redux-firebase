import React from 'react'
import styled from 'styled-components';
import logo from "../assets/slack_logo_icon_134008.png" 

import { Button } from '@mui/material';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const signIn = (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider).catch((error) => alert(error.message));
        navigate('/')
    };

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img
                    style={{ animation: `spin ${8}s linear infinite` }}
                    src={logo} alt="" />
                <h1>Sign in to Slack Clone</h1>
                <p>Developer Community</p>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    background-color: #f8f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;
const LoginInnerContainer = styled.div`
    padding: 80px;
    text-align: center;
    color: var(--slack-color);
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgb(0, 0, 0, 0.24);

    > img {
        object-fit: contain;
        height: 200px;
        width: 200px;

    }
    > button {
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: var(--slack-color) !important;
        color: #fff;
    }
`;
