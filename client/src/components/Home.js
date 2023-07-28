import React, { useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ShowActivities from "./ShowActivities";

const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <HomeContainer>
      <Container>
        <Row>
          <Col>
            <h1 className="display-3">
              Welcome {user.username}! You are successfully logged in!!
            </h1>
          </Col>
        </Row>
      </Container> 

      <Col md={3} className="ps-5">

        <ShowActivities />
          
      </Col>

    </HomeContainer>
  )
}

export default Home;

const HomeContainer = styled.div`
  padding-top: 180px;
`;