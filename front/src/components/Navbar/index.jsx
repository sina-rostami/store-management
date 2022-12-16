import React from 'react'

import styled from "styled-components";

const navBarContainer = styled.div`
  width: 100%;
  height: 60;
  boxShadow: 0 1px 3px rgba(15,15,0.13); 
  display: flex;
  alignItems: center;
  padding: 0 1.5em;
`;

const LeftSection = styled.div`
  display: flex;
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justifyContent: center;
`;

const RightSection = styled.div`
  display: flex;
`;

export function Navbar(props){
  return <navBarContainer>
    <LeftSection></LeftSection>
    <MiddleSection></MiddleSection>
    <RightSection></RightSection>
  </navBarContainer>
}