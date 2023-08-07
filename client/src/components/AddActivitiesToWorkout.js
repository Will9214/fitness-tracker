import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { getUserActivities } from "../redux/activities/activityActions";
import { Button, Col, Form, Row } from "react-bootstrap";
import ShowWorkouts from "./ShowWorkouts";
import { addActivityToWorkout, deleteActivityFromWorkout,getUserWorkouts } from "../redux/workouts/workoutActions";


const AddActivitiesToWorkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activities } = useSelector(state => state.userActivities);
  const { workouts } = useSelector(state => state.userWorkouts);
  const { userId } = useSelector(state => state.auth.user);

  // Fetch userActivities on page refresh
  useEffect(() => {
    if (activities.length === 0) {
      dispatch(getUserActivities());
    } 
    if (workouts.length === 0) {
      dispatch(getUserWorkouts());
    }
  });

  const location = useLocation();
  const path = matchPath("/add_activities_to_workout/:workoutId", location.pathname);
  const pathId = path.params.workoutId;
  const workout = workouts.find(workout => workout?._id === pathId);
  const workoutId = workout?._id;


  const handleAddActivityClick = (e) => {
    const activityId = e.target.id;
    dispatch(addActivityToWorkout({ workoutId, activityId, userId }));
  };

  const handleDeleteActivityClick = (e) => {
    const activityId = e.target.id;
    dispatch(deleteActivityFromWorkout({ workoutId, activityId }));
  }

  const handleBackClick = () => {
    navigate("/home");
  };

  const renderUserActivities = () => {
    if (activities) {
      return activities?.map((activity) => (
        <div key={activity._id} id={activity._id} className="p-1">
          <ActivityContainer id={activity._id}>
            <Row>
              <Col>
                {activity.name}
              </Col>
              <Col md={2}>
                <PlusButton id={activity._id} onClick={handleAddActivityClick}>&#x2795;</PlusButton>
              </Col>
            </Row>
          </ActivityContainer>
        </div>
      ))
    }
  };

  const renderActivitiesAddedToWorkout = () => {
    if (workout) {
      return workout.activities?.map((activity) => (
        <div key={activity._id} id={activity._id} className="p-1">
          <ActivityContainer id={activity._id}>
            <Row>
              <Col>
                {activity.name}
              </Col>
              <Col md={2}>
                <MinusButton id={activity._id} onClick={handleDeleteActivityClick}>&#x2796;</MinusButton>
              </Col>
            </Row>
          </ActivityContainer>
        </div>
      ))
    }
  }



  return (
    <AddWorkoutContainer className="container">
      <FormContainer className="col-md-8 offset-md-2">
        <h3 className="text-center">{workout?.name}</h3>
        <hr />
        <Form>
          
          <Form.Group className="mb-3">
            <Form.Label>Choose Activities In Workout</Form.Label>
            <Row>
              
              <Col md={5}>
                <div>Activities</div>
              
                <SelectActivities>
                  {renderUserActivities()}
                </SelectActivities>

              </Col>

              <Col md={2} className="text-center my-auto">
                &#x2192; &#x2192;
              </Col>

              <Col md={5}>
                <div>Activities to be added to Workout</div>
               
                <AddedActivities>
                  {renderActivitiesAddedToWorkout()}
                </AddedActivities>

              </Col>
            </Row>
          </Form.Group>

          <Row className="text-center">
            <Col>
              <Button type="submit">
                Submit
              </Button>
            </Col>
            <Col>
              <Button onClick={handleBackClick}>
                Back
              </Button>
            </Col>
          </Row>

        </Form>
      </FormContainer>
    </AddWorkoutContainer>
  )
};

export default AddActivitiesToWorkout;

const AddWorkoutContainer = styled.div`
  padding-top: 180px;
`;

const FormContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
`;

const SelectActivities = styled.div`
  border: 1px solid black;
  height: 186px;
  overflow-y: auto;
`;

const PlusButton = styled.div`
  cursor: pointer;
  &:hover {
    background: grey;
  }
`;

const MinusButton = styled.div`
  cursor: pointer;
  &:hover {
    background: grey;
  }
`;

const AddedActivities = styled.div`
 border: 1px solid black;
 height: 186px;
 overflow-y: auto;
`;

const ActivityContainer = styled.div`
  border: 1px solid black;
  padding: 6px;
`;