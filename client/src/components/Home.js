import React, { useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ShowActivities from "./ShowActivities";
import { getUserActivities } from "../redux/activities/activityActions";
import SearchBar from "./SearchBar";
import ExerciseResults from "./ExerciseResults";

const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      dispatch(getUserActivities())
    }
  }, [userToken, dispatch] )

  const handleSearchClick = () => {
    navigate("/search_exercise");
  };

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
      
      <Row>
        <Col md={3} className="ps-5">
          <ShowActivities />
        </Col>
        <Col md={9} className="pe-5">
          <Button onClick={handleSearchClick}>Search for an Exercise</Button>
        </Col>
      </Row>
     

    </HomeContainer>
  )
}

export default Home;

const HomeContainer = styled.div`
  padding-top: 180px;
`;