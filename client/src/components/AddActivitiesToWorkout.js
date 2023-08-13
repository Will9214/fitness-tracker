import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { getUserActivities } from "../redux/activities/activityActions";
import { Button, Col, Form, Row } from "react-bootstrap";
import { addActivityToWorkout, deleteActivityFromWorkout,getUserWorkouts } from "../redux/workouts/workoutActions";

// Displays and allows user to add certain activities to a workout
const AddActivitiesToWorkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activities } = useSelector(state => state.userActivities);
  const { workouts } = useSelector(state => state.userWorkouts);
  const { userId } = useSelector(state => state.auth.user);

  // Fetch userActivities and userWorkouts on page refresh
  useEffect(() => {
    if (activities.length === 0) {
      dispatch(getUserActivities());
    } 
    if (workouts.length === 0) {
      dispatch(getUserWorkouts());
    }
  });

  // find workout from workoutId given in path parameters
  const location = useLocation();
  const path = matchPath("/add_activities_to_workout/:workoutId", location.pathname);
  const pathId = path.params.workoutId;
  const workout = workouts.find(workout => workout?._id === pathId);
  const workoutId = workout?._id;

  // Plus Button will add activity to workout when clicked
  const handleAddActivityClick = (e) => {
    const activityId = e.target.id;
    dispatch(addActivityToWorkout({ workoutId, activityId }));
  };

  // Minus Button will delete activity from the workout when clicked
  const handleDeleteActivityClick = (e) => {
    const activityId = e.target.id;
    dispatch(deleteActivityFromWorkout({ workoutId, activityId }));
  };

  // Back Button 
  const handleBackClick = () => {
    navigate(`/workouts/${workoutId}`);
  };

  // render the activities that belong to the user
  const renderUserActivities = () => {
    if (activities) {
      return activities?.map((activity) => (
        <div key={activity._id} id={activity._id} className="p-1">
          <ActivityContainer id={activity._id}>
            <Row>
              <Col>
                {activity.name}
              </Col>
              <Col xs={2} sm={2}>
                <PlusButton id={activity._id} onClick={handleAddActivityClick}>&#x2795;</PlusButton>
              </Col>
            </Row>
          </ActivityContainer>
        </div>
      ))
    }
  };

  // render the activities that belong to the specific workout
  const renderActivitiesAddedToWorkout = () => {
    if (workout) {
      return workout.activities?.map((activity) => (
        <div key={activity._id} id={activity._id} className="p-1">
          <ActivityContainer id={activity._id}>
            <Row>
              <Col>
                {activity.name}
              </Col>
              <Col xs={2} sm={2}>
                <MinusButton id={activity._id} onClick={handleDeleteActivityClick}>&#x2796;</MinusButton>
              </Col>
            </Row>
          </ActivityContainer>
        </div>
      ))
    }
  };


  return (
    <AddWorkoutContainer className="container">
      <FormContainer className="col-md-8 offset-md-2">
        <h3 className="text-center">{workout?.name}</h3>
        <hr />
        <Form>
          
          <Form.Group className="mb-3">
            <Form.Label>Choose Activities You Would Like to Add to Your <strong>{workout?.name}</strong> Workout</Form.Label>
            <Row>
              
              <Col sm={5}>
                <div><strong>Activities</strong></div>
              
                <SelectActivities>
                  {renderUserActivities()}
                </SelectActivities>

              </Col>

              <Col sm={2} className="text-center my-auto">
                &#x2192; &#x2192;
              </Col>

              <Col sm={5}>
                <div><strong>Activities In Workout</strong></div>
               
                <AddedActivities>
                  {renderActivitiesAddedToWorkout()}
                </AddedActivities>

              </Col>
            </Row>
          </Form.Group>

          <Row className="text-center">
            <Col>
              <Button onClick={handleBackClick}>
                Back to Workout
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
  padding-bottom: 80px;
`;

const FormContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding: 20px;
`;

const SelectActivities = styled.div`
  box-shadow: inset 2px 2px 3px;
  height: 186px;
  overflow-y: auto;
  padding: 10px 0;
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
 box-shadow: inset 2px 2px 3px;
 height: 186px;
 overflow-y: auto;
 padding: 10px 0;
`;

const ActivityContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding: 6px;
  margin: 0 10px;
`;