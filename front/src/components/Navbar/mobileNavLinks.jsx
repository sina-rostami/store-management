import React, { useState } from "react"
import styled from "styled-components"
import MenuToggle from "../MenuToggle/index.jsx";
import { Accessibility } from "./accessibility.jsx";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 18px;
  display: flex;
  margin-bottom: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  fontsize: inherit;
`;

const Marginer = styled.div`
  height: 1em;
`;

export function MobileNavLinks(props){
  const [isOpen, setOpen] = useState(false);  

  return ( 
  <NavLinksContainer>
    <MenuToggle isOpen = {isOpen} toggle= {() => setOpen(!isOpen)}  />
    {isOpen && <LinksWrapper>
    <LinkItem>
        <Link href="http://localhost:8080/sellers"> مدیریت فروشندگان </Link>
      </LinkItem>
      <LinkItem>
        <Link href="http://localhost:8080/customers"> مدیریت مشتری ها </Link>
      </LinkItem>
      <LinkItem>
        <Link href="http://localhost:8080/bills"> مشاهده فاکتورها </Link>
      </LinkItem>
      <LinkItem>
        <Link href="http://localhost:8080/products"> محصولات </Link>
      </LinkItem>
      <LinkItem>
        <Link href="http://localhost:8080/admin-panel"> پنل ادمین </Link>
      </LinkItem>
      <Marginer />
      <Accessibility />
    </LinksWrapper>}
  </NavLinksContainer>
  )
}

export default MobileNavLinks