import React from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import styles from "./styles"
import { menuItems } from "./menuItems"
import { useAuthState } from "../../context/index.js"


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
  font-weight: 800;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent:
  transition: all 220ms ease-in-out;
  cursor: pointer;

  &:hover {
    border-top: 2px solid #2980b9;
  }
`;

export function NavLinks(props) {
  const { role } = useAuthState()
  const classes = styles()

  return <NavLinksContainer>
    <LinksWrapper>
      {
        menuItems.map(menuItem => {
          if (menuItem.roles.includes(role)) {
            return (
              <LinkItem key={menuItem.path}>
                <Link className={classes.link} to={menuItem.path}>{menuItem.item}</Link>
              </LinkItem>
            )
          }
        })
      }
    </LinksWrapper>
  </NavLinksContainer>
}

export default NavLinks