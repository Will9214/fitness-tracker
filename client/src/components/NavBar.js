import { useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  signOut } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getUser } from "../redux/auth/authActions";

// display NavBar at top of screen with application name, username, and signout button
const NavBar = () => {

  const { user, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Keeping this in NavBar because user needs to be present to navigate to /home
  // A refresh of the page caused user to change to null and navigate away from /home
  // Since the useEffect was in home it couldn't be triggered to repopulate user
  // Will only have getUser in Navbar. All others will be on home component
  useEffect(() => {
    if (userToken) {
      dispatch(getUser())
    }
  }, [userToken, dispatch] )

  // dispatches signout action and navigates to login screen when signOut button is clicked
  const handleSignOutClick = () => {
    dispatch(signOut());
    navigate("/");
  }

  // displays different NavBar depending on if user is logged in or not
  const renderLinks = () => {
    if (user) {
      return (
        <Col xs={4}>
          <Col>
            <UserNameDiv>{user.username}</UserNameDiv>
          </Col>
          <Col>
            <SignOutDiv onClick={handleSignOutClick}>Sign Out</SignOutDiv>
          </Col>
        </Col>
      );
    } else {
      return;
    }
  };

  return (
    <NavContainer>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1 className="display-3" style={{ paddingTop: "8px" }}>
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
  height: 150px;
  padding: 2em;

  @media (max-width: 576px) {
    padding: 5px;
    height: 75px;
  }
`;

const UserNameDiv = styled.div`
  font-size: 30px;
  text-align: center;

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

const SignOutDiv = styled.div`
  font-size: 30px;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;