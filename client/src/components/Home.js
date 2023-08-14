import { useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserActivities } from "../redux/activities/activityActions";
import { getUserCompletedWorkouts, getUserWorkouts } from "../redux/workouts/workoutActions";
import ShowCompletedWorkouts from "./ShowCompletedWorkouts";

// displays home screen
const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const userToken = localStorage.getItem("userToken");
 
  const dispatch = useDispatch();

  // fetches userActivities and userWorkouts
  useEffect(() => {
    if (userToken) {
      dispatch(getUserActivities())
      dispatch(getUserWorkouts());
      dispatch(getUserCompletedWorkouts());
    }
  }, [userToken, dispatch] )

  return (
    <HomeContainer>
      <Container>
        <Row>
          <Col>
            <h1 className="display-3">
              Welcome, {user.username}!
            </h1>
              <HomeDescription>
                <li>View your Completed Workouts below</li>
                <li>Create Activities in the Activities tab</li>
                <li>Create a Workout in the Workouts tab and add your desired activities</li>
                <li>View your workout and update the activities within the workout in real time while at the gym or at the end of a run</li>
                <li>Search for exercises in the Search tab and add them as activities</li>
              </HomeDescription>
            
          </Col>
        </Row>
      </Container> 
      
      <ShowCompletedWorkouts />
        
    </HomeContainer>
  )
};

export default Home;

const HomeContainer = styled.div`
  padding-top: 200px;
  padding-bottom: 20px;

  @media (max-width: 576px) {
    padding-top: 85px;
    padding-bottom: 60px;
  }
`;

const HomeDescription = styled.div`

@media (max-width: 576px) {
  font-size: 11px;
}
`;