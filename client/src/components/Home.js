import { useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserActivities } from "../redux/activities/activityActions";
import { getUserCompletedWorkouts, getUserWorkouts } from "../redux/workouts/workoutActions";
import ShowCompletedWorkouts from "./ShowCompletedWorkouts";

// displays home screen
const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetches userActivities and userWorkouts
  useEffect(() => {
    if (userToken) {
      dispatch(getUserActivities())
      dispatch(getUserWorkouts());
      dispatch(getUserCompletedWorkouts());
    }
  }, [userToken, dispatch] )

  // navigates to search for exercise screen
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
      
      <ShowCompletedWorkouts />
        
    </HomeContainer>
  )
};

export default Home;

const HomeContainer = styled.div`
  padding-top: 170px;
  padding-bottom: 70px;
`;