import React from "react"
import styled from "styled-components"
import { useAuthDispatch } from '../../context/index.js'

const AccessibilityContainer = styled.div`
    display: flex;
    margin-left: 10px:
`;

const LoginButton = styled.button`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #222;
    font-size: 14px;
    font-weight: 600;
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid#00c9ff;
    transition: all 240ms ease-in-out;
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color #00c9ff;
    }

    &:not(:last-of-type){
        margin-left: 7px;
    }
`;

const RegisterButton = styled.button`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border-radius: 20px;
    background-color: #2980b9;
    background-image: lenear-gradient(to right, transparent 0%, #00c9ff 100%);
    transition: all 240ms ease-in-out;
    cursor: pointer;

    &:hover {
        background-color #00c9ff;
    }

    &:not(:last-of-type){
        margin-left: 7px;
    }
`;

const Exit = styled.button`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border-radius: 20px;
    background-color: #2980b9;
    background-image: lenear-gradient(to right, transparent 0%, #00c9ff 100%);
    transition: all 240ms ease-in-out;
    cursor: pointer;

    &:hover {
        background-color #00c9ff;
    }

    &:not(:last-of-type){
        margin-left: 7px;
    }
`;
export function Accessibility(props){
    const authDispatch = useAuthDispatch()

    const logoutHandler = () => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('role')
        authDispatch({ type: 'logout' })
    }

    return <AccessibilityContainer>
        <Exit onClick={logoutHandler}>
            خروج
        </Exit>
    </AccessibilityContainer>
}
