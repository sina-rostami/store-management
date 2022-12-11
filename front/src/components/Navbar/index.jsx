import React from 'react';
import { useMediaQuery } from 'react-responsive';

import styled from "styled-components";
import { Logo } from '../Logo/index.jsx';
import { Accessibility } from './accessibility.jsx';
import { NavLinks } from './navLinks.jsx';
import { DeviceSize } from '../Responsive/index.jsx';
import MobileNavLinks from './mobileNavLinks.jsx';


const NavBarContainer = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15,15,0.13); 
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  margin-bottom: 30px;
  background-color: #74b9ff;
`;

const LeftSection = styled.div`
  display: flex;
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
`;

export function Navbar(props){
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return <NavBarContainer>
    <LeftSection>
      <Logo />
    </LeftSection>
    <MiddleSection>
      {!isMobile && <NavLinks />}
    </MiddleSection>
    <RightSection>
      {!isMobile && <Accessibility />}
      {isMobile && <MobileNavLinks />}
    </RightSection>
  </NavBarContainer>
}

export default Navbar