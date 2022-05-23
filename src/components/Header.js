import React from 'react'
import styled from "styled-components"
import logo from "../assets/slack_logo_icon_134008.png"

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { auth } from '../firebase';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <HeaderContainer>
      {/*Header left */}
      <HeaderLeft>
        <img
          onClick={() => auth.signOut()}
          style={{ animation: `spin ${20}s linear infinite` }}
          src={logo} alt="" />
        <Link to='/' style={{ textDecoration: "none", color: "#ffffff", fontSize: "10px" }}>
          <h1>SLACK CLONE</h1>
        </Link>
        <AccessTimeIcon />
      </HeaderLeft>

      {/*Header search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder='Search Dev Comunity' />
      </HeaderSearch>

      {/*Header Right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
  color: #ffffff;
  background-color: var(--slack-color);
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
 
  > img {
        object-fit: contain;
        height: auto;
        width: 18%;
        margin-left: 10px;
        :hover {
    opacity: 2.0;
    cursor: pointer;
    }
  }
  > a > h1 {
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 5px;
  }

  > .MuiSvgIcon-root {
    font-size: 21px;
    margin-right: 5px;
    margin-left: auto;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 0,6;
  align-items: center;
  margin: 15px 5px;
  border-radius: 25px;
  border: 1px #421f44 solid;
  background-color: #421f44;
  :hover{
    opacity: 1;
  }

    > .MuiSvgIcon-root {
    font-size: 21px;
    margin-left: 20px;
  }
  > input {
    border: none;
    text-align: center;
    margin-left: 35px;
    min-width: 30vw;
    outline: #421f44;
    background-color: transparent;
    color: #ffffff;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;

 > .MuiSvgIcon-root {
    font-size: 21px;
    margin-right: 10px;
    margin-left: auto;
    cursor: pointer;
 }
`;
