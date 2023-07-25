import React, { useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate();


  return (
    <HomeContainer>
      <Container>
        <Row>
          <Col>
            <h1 className="display-3">
              Welcome {userInfo?.username}! You are successfully logged in!!
            </h1>
          </Col>
        </Row>
      </Container>
    </HomeContainer>
  )
}

export default Home;

const HomeContainer = styled.div`
  padding-top: 180px;
`;