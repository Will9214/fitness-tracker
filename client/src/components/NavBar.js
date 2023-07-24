import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";


const NavBar = () => {


  return (
    <NavContainer>
      <Container>
        <Row>
          <Col>
            <h1 className="display-3">
              Fit'n'BeGreat
            </h1>
          </Col>
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