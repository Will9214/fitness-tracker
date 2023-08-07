import React from "react";
import { Button, CloseButton, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ShowWorkouts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { workouts } = useSelector(state => state.userWorkouts);


  const handleWorkoutClick = (e) => {
    if (e.target.ariaLabel !== "remove") {
      const workoutId = e.currentTarget.id;
      navigate(`/workouts/${workoutId}`);
    }
  };

  const handleWorkoutDeleteClick = (e) => {

  };

  const handleAddWorkoutClick = () => {
    navigate("/add_workout");
  };

  const renderUserWorkouts = () => {
    if (workouts) {
      return workouts.map((workout) => (
        <div key={workout._id} id={workout._id} className="p-1">
          <WorkoutContainer id={workout._id} onClick={handleWorkoutClick}>
            <Row>
              <Col>
                {workout.name}
              </Col>
              <Col md={2}>
                <CloseButton id={workout._id} onClick={handleWorkoutDeleteClick} aria-label="remove" ></CloseButton>
              </Col>
            </Row>
          </WorkoutContainer>
        </div>
      ))
    }
  }

  return (
    <WorkoutsContainer>
      <div className="display-6 text-center">Workout List</div>
      <hr className="m-1" />

      {renderUserWorkouts()}

      <Container className="text-center mt-2 mb-3">
        <Button onClick={handleAddWorkoutClick}>Create Workout</Button>
      </Container>
    </WorkoutsContainer>
  )
};

export default ShowWorkouts;

const WorkoutsContainer = styled.div`
  border: 1px solid black;
  height: auto;
  border-radius: 10px;
`;

const WorkoutContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 6px;
  &:hover {
    background-color: #e0e0e0;
  }
`;