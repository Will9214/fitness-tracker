import { Button, CloseButton, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserWorkouts, removeWorkoutThunk } from "../redux/workouts/workoutActions";
import { useEffect } from "react";

// displays user's workouts in a list
const ShowWorkouts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { workouts } = useSelector(state => state.userWorkouts);

  useEffect(() => {
    if (workouts.length === 0) {
      dispatch(getUserWorkouts());
    }
  })

  // navigates to individual workout's screen when workout is clicked
  const handleWorkoutClick = (e) => {
    if (e.target.ariaLabel !== "remove") {
      const workoutId = e.currentTarget.id;
      navigate(`/workouts/${workoutId}`);
    }
  };

  // dispatches delete workout function when clicked
  const handleWorkoutDeleteClick = (e) => {
    if (e.target.ariaLabel === "remove") {
      const workoutId = e.currentTarget.id;
      dispatch(removeWorkoutThunk({ workoutId }));
    }
  };

  // navigates to add workout screen when clicked
  const handleAddWorkoutClick = () => {
    navigate("/add_workout");
  };

  // renders user's workouts
  const renderUserWorkouts = () => {
    if (workouts) {
      return workouts.map((workout) => (
        <div key={workout._id} id={workout._id} className="p-1">
          <WorkoutContainer id={workout._id} onClick={handleWorkoutClick}>
            <Row>
              <Col>
                {workout.name}
              </Col>
              <Col xs={2}>
                <CloseButton id={workout._id} onClick={handleWorkoutDeleteClick} aria-label="remove" ></CloseButton>
              </Col>
            </Row>
          </WorkoutContainer>
        </div>
      ))
    }
  }

  return (
    <WorkoutScreen>
      <WorkoutsDescription>
        <li>Create a workout and add activities that you would like to be a part of that workout</li>
        <li>Click on a workout to view it and its activities</li>
        <li>Fill out the info for the activities within the workout and complete the workout to save it</li>
      </WorkoutsDescription>
      <WorkoutsContainer className="col-sm-3 offset-sm-4">
        <div className="display-6 text-center">Workout List</div>
        <hr className="m-1" />

        {renderUserWorkouts()}

        <Container className="text-center mt-2 mb-3">
          <Button onClick={handleAddWorkoutClick}>Create Workout</Button>
        </Container>
      </WorkoutsContainer>
    </WorkoutScreen>
  )
};

export default ShowWorkouts;

const WorkoutScreen = styled.div`
  padding: 0 10px;  
  padding-top: 170px;
  
  @media (max-width: 576px) {
    padding-top: 100px;
  }
`;

const WorkoutsContainer = styled.div`
  padding-bottom: 1px;
  margin-bottom: 80px;
  box-shadow: 2px 2px 5px;
`;

const WorkoutContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding: 6px;
  &:hover {
    background-color: #e0e0e0;
  }
  margin: 0 5px;
`;

const WorkoutsDescription = styled.div`
  margin-bottom: 20px;

  @media (min-width: 576px) {
    margin-left: 33.33%;
  }

  @media (max-width: 576px) {
    font-size: 11px;
  }
`;