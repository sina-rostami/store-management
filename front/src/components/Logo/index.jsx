import React from 'react'
import styles from './styles'
import styled from 'styled-components'
import HouseLogo from '../../../public/asset/images/logo.png'


const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 29px;
  height: 29px;
  margin-left: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h2`
  font-size: 22px;
  margin: 0;
  margin-left: 4px;
  color: #222;
  font-weight: 800;
`;

export function Logo(props){
  return <LogoWrapper>
    <LogoImg><img src={HouseLogo} alt="مدیریت فروشگاه"/></LogoImg>
    <LogoText>مدیریت فروشگاه</LogoText>
  </LogoWrapper>
}

export default Logo;