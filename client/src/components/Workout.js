import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserWorkouts } from "../redux/workouts/workoutActions";
import { Button, Col, Container, Row } from "react-bootstrap";

// WILL NEED TO ADD:
// activities that are part of the workout. Accordion style
// add a back button
// add an edit activities button
// add name edit if name is clicked on

const Workout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { workouts } = useSelector(state => state.userWorkouts);

  // Fetch userWorkouts on page refresh
  useEffect(() => {
    if (workouts.length === 0) {
      dispatch(getUserWorkouts());
    }
  });

  const location = useLocation();
  const path = matchPath("/workouts/:workoutId", location.pathname);
  const pathId = path.params.workoutId;
  const workout = workouts.find(workout => workout?._id === pathId);

  const workoutId = workout?._id;
  
  const handleBackClick = () => {
    navigate("/home");
  };

  const handleAddRemoveActivitiesClick = () => {
    navigate(`/add_activities_to_workout/${workoutId}`)
  }

  return (
    <div style={{ paddingTop: "180px" }}>
      <WorkoutContainer className="col-md-8 offset-md-2">
        <div className="display-6 text-center">{workout?.name}</div>
        <hr className="m-1" />


        <Container className="col-md-8 offset-md-2">

          <Container className="text-center mt-2 mb-3">
            <Row>
              <Col>
                <Button onClick={handleAddRemoveActivitiesClick}>Add/Remove Activities</Button>
              </Col>
              <Col>
                <Button onClick={handleBackClick}>Back</Button>
              </Col>
            </Row>
          </Container>

        </Container>
      </WorkoutContainer>
    </div>
  )
};

export default Workout;

const WorkoutContainer = styled.div`
  border: 1px solid black;
  height: auto;
  border-radius: 10px;
`;

const FieldTitle = styled.div`
  text-decoration: underline;
  font-weight: 700;
`;