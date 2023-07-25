import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../redux/auth/authService";
import {  signOut, setCredentials } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";


const NavBar = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15 mins
    pollingInterval: 900000,
  });  
  
  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch]);

  const handleSignOutClick = () => {
    dispatch(signOut());
    navigate("/");
  }

  const renderLinks = () => {
    if (userInfo) {
      return (
        <Fragment>
          <Col md={6}>
            <UserNameDiv>{userInfo.username}</UserNameDiv>
          </Col>
          <Col md={2}>
            <SignOutDiv onClick={handleSignOutClick}>Sign Out</SignOutDiv>
          </Col>
        </Fragment>
      );
    } else {
      return;
    }
  }

  return (
    <NavContainer>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1 className="display-3">
              Fit'n'BeGreat
            </h1>
          </Col>
          {renderLinks()}
        </Row>
      </Container>
    </NavContainer>
  )
}

export default NavBar;

const NavContainer = styled.div`
  position: fixed;
  z-index: 999;
  background: #282c34;
  color: white;
  margin: 0;
  width: 100%;
  height: auto;
  padding: 2em;
`;

const UserNameDiv = styled.div`
  font-size: 30px;
  text-align: center;
`;

const SignOutDiv = styled.div`
  font-size: 30px;
  &:hover {
    text-decoration: underline;
  }
`;