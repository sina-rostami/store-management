import React from "react"
import styled from "styled-components"


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
`;

const LinkItem = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent:
  transition: all 220ms ease-in-out;

  &:hover {
    border-top: 2px solid #2980b9;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  fontsize: inherit;
`;

export function NavLinks(props){
  return <NavLinksContainer>
    <LinksWrapper>
    <LinkItem>
        <Link href="#"> About us </Link>
      </LinkItem>
      <LinkItem>
        <Link href="#"> How It Works </Link>
      </LinkItem>
      <LinkItem>
        <Link href="http://localhost:8080/products"> Products </Link>
      </LinkItem>
      <LinkItem>
        <Link href="http://localhost:8080/admin-panel"> AdminPanel </Link>
      </LinkItem>
    </LinksWrapper>
  </NavLinksContainer>
}

export default NavLinks