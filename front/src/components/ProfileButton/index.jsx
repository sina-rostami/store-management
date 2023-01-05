import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import DropDownMenu from '../DropDrownMenu/index.jsx';

const Profile = styled.button`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border-radius: 22px;
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

    const [isOpen, setIsOpen] = useState(false)

    return(
        <div>
            <Profile onClick={() => setIsOpen(!isOpen)}>
            <Avatar src="/broken-image.jpg" />
            </Profile>
            {isOpen && <DropDownMenu/>}
        </div>
    )
}

export default ProfileButton