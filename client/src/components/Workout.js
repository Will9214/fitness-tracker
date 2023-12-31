import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addCompletedWorkout, getUserWorkouts } from "../redux/workouts/workoutActions";
import { Button, Col, Container, Row, Accordion, Table } from "react-bootstrap";
import WorkoutActivities from "./WorkoutActivities";
import { getUserActivities } from "../redux/activities/activityActions";

// NEED TO ADD:
// add name edit if name is clicked on

// displays individual workout and the activities associated with the workout
const Workout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { workouts, loading, completedWorkouts } = useSelector(state => state.userWorkouts);

  // Fetch userWorkouts on page refresh
  useEffect(() => {
    if (workouts.length === 0) {
      dispatch(getUserWorkouts());
    }
  });

  // workout from workoutId given in path parameters
  const location = useLocation();
  const path = matchPath("/workouts/:workoutId", location.pathname);
  const pathId = path.params.workoutId;
  const workout = workouts.find(workout => workout?._id === pathId);

  const workoutId = workout?._id;
  
  // navigates to home when clicked
  const handleBackClick = () => {
    navigate("/workouts");
  };

  // navigates to add activities to workout screen
  const handleAddRemoveActivitiesClick = () => {
    navigate(`/add_activities_to_workout/${workoutId}`)
  };

  // dispatch add completed workout action and navigate user back to home
  const handleWorkoutComplete = () => {
    dispatch(addCompletedWorkout({ workout }));
    navigate("/home");
  };

  if (loading === false) {
    return (
      <WorkoutScreen>      
        <WorkoutInstructions>
          <li>Add or Remove Activities from the Workout</li>
          <li>Click through the activities and input your data in real time while at the gym</li>
          <li>Click on the activity values to edit, then press enter or click out of the input to save</li>
          <li>Click Complete Workout when you have finished the workout and completed all the activities</li>
          <li>Completed Workouts will be logged and displayed on the Home Screen</li>
          <li>This workout template will stay in your Workouts and be available to use again</li>
        </WorkoutInstructions>

        <WorkoutContainer className="col-md-8 offset-md-2">
          <div className="display-6 text-center">{workout?.name}</div>
          <hr className="m-1" />
          
          <Container className="col-md-8 offset-md-2">
          
            <Accordion>
              {workout.activities?.length > 0 ? (
                workout.activities?.map((activity) => (
                  <WorkoutActivities key={activity._id} activityId={activity._id} workoutId={workoutId} />
                ))
              ) : (
                <>
                  <h4>There are no Activities in this Workout.</h4>
                  <h6>Add Activities below using the Add/Remove Activities Button</h6>
                </>
              )}
            </Accordion>  
          </Container>

          <Container className="text-center mt-2 mb-3">
            <Row>
              <Col>
                <Button onClick={handleAddRemoveActivitiesClick}>Add/Remove Activities</Button>
              </Col>
              <Col>
                <Button onClick={handleWorkoutComplete}>Complete Workout</Button>
              </Col>
              <Col>
                <Button onClick={handleBackClick}>Back</Button>
             </Col>
            </Row>
          </Container>

        </WorkoutContainer>
      </WorkoutScreen>
    )
  }
};

export default Workout;

const WorkoutScreen = styled.div`
  padding-top: 210px;
  padding-bottom: 40px;
  margin: 0 10px;

  @media (max-width: 576px) {
    padding-top: 100px;
    padding-bottom: 70px;
  }
`;

const WorkoutContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding-bottom: 1px;
`;

const WorkoutInstructions = styled.div`
  margin-left: 15px;
  margin-bottom: 20px;

  @media(min-width: 576px) {
    margin-left: 20%
  }

  @media (max-width: 576px) {
    font-size: 11px;
  }
`;