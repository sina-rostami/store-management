import { Button } from 'bootstrap';
import React from 'react';
import styled from 'styled-components';
import {Account} from 'material-ui-icons'

const Profile = styled.button`
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

function ProfileButton(props){
    return(
        <div>
            <Profile>کاربر</Profile>
        </div>
    )
}

export default ProfileButton