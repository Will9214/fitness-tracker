import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserWorkouts } from "../redux/workouts/workoutActions";
import { Button, Col, Container, Row, Accordion, Table } from "react-bootstrap";

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
  };

  

  const renderWorkoutActivities = () => {
    if (workout.activities?.length > 0) {
      return workout.activities.map((activity) => {
        return (
          <Accordion.Item eventKey={activity._id}>
            <Accordion.Header>{activity.name}</Accordion.Header>
            <Accordion.Body>
              { activity.type.toLowerCase() === "strength" ? (
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Weight</th>
                      <th>Sets</th>
                      <th>Reps</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{activity.weight}</td>
                      <td>{activity.sets}</td>
                      <td>{activity.reps}</td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Distance</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{activity.distance}</td>
                      <td>{activity.time}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
             
              <div>{activity.description}</div>
            </Accordion.Body>
          </Accordion.Item>
      )}   

        )
    } else {
      return (
        <>
          <h4>There are no Activities in this Workout.</h4>
          <h6>Add Activities below using the Add/Remove Activities Button</h6>
        </>
        )
    }
  };

  return (
    <div style={{ paddingTop: "180px" }}>
      <WorkoutContainer className="col-md-8 offset-md-2">
        <div className="display-6 text-center">{workout?.name}</div>
        <hr className="m-1" />

        <Container className="col-md-8 offset-md-2">
          
          <Accordion>
            {renderWorkoutActivities()}
          </Accordion>

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