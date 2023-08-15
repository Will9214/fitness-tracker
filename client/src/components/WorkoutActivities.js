import { useEffect, useState } from "react";
import { Accordion, Container, Table, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateActivity } from "../redux/activities/activityActions";
import { updateActivityDistanceInWorkout, updateActivityRepsInWorkout, updateActivitySetsInWorkout, updateActivityWeightInWorkout, updatedActivityTimeInWorkout } from "../redux/workouts/workoutSlice";


// renders the activities that are associated with the particular workout
const WorkoutActivities = ({ activityId, workoutId }) => {
  const dispatch = useDispatch();

  const { workouts } = useSelector(state => state.userWorkouts);
  const workout = workouts.find(workout => workout?._id === workoutId);
  const activity = workout.activities.find(activity => activity?._id === activityId);

  
  // handle editing of weight value in workout
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const handleWeightClick = () => setIsEditingWeight(true);
  const handleWeightClose = () => setIsEditingWeight(false);
  
  const [editedActivityWeight, setEditedActivityWeight] = useState(activity.weight);

  const handleUpdateWeight = () => {
    dispatch(updateActivity({ activityId, editedActivityWeight }));
    dispatch(updateActivityWeightInWorkout({ workoutId, activityId, editedActivityWeight }));
    setIsEditingWeight(false);
  };
    
  // handle editing of Sets value in workout
  const [isEditingSets, setIsEditingSets] = useState(false);
  const handleSetsClick = () => setIsEditingSets(true);
  const handleSetsClose = () => setIsEditingSets(false);
  const [editedActivitySets, setEditedActivitySets] = useState(activity.sets);

  const handleUpdateSets = () => {
    dispatch(updateActivity({ activityId, editedActivitySets }));
    dispatch(updateActivitySetsInWorkout({ workoutId, activityId, editedActivitySets }));
    setIsEditingSets(false);
  };

  // handle editing of Reps value in workout
  const [isEditingReps, setIsEditingReps] = useState(false);
  const handleRepsClick = () => setIsEditingReps(true);
  const handleRepsClose = () => setIsEditingReps(false);
  const [editedActivityReps, setEditedActivityReps] = useState(activity.reps);

  const handleUpdateReps = () => {
    dispatch(updateActivity({ activityId, editedActivityReps }));
    dispatch(updateActivityRepsInWorkout({ workoutId, activityId, editedActivityReps }));
    setIsEditingReps(false);
  };
      
  // handle editing of distance value in workout
  const [isEditingDistance, setIsEditingDistance] = useState(false);
  const handleDistanceClick = () => setIsEditingDistance(true);
  const handleDistanceClose = () => setIsEditingDistance(false);
  const [editedActivityDistance, setEditedActivityDistance] = useState(activity.distance);
  
  const handleUpdateDistance = () => {
    dispatch(updateActivity({ activityId, editedActivityDistance }));
    dispatch(updateActivityDistanceInWorkout({ workoutId, activityId, editedActivityDistance }));
    setIsEditingDistance(false);
  };   
      
  // handle editing of time value in workout
  const [isEditingTime, setIsEditingTime] = useState(false);
  const handleTimeClick = () => setIsEditingTime(true);
  const handleTimeClose = () => setIsEditingTime(false);
  const [editedActivityTime, setEditedActivityTime] = useState(activity.time);
  
  const handleUpdateTime = () => {
    dispatch(updateActivity({ activityId, editedActivityTime }));
    dispatch(updatedActivityTimeInWorkout({ workoutId, activityId, editedActivityTime }));
    setIsEditingTime(false);
  };

  // if enter key is press a specific function is called depending on what input the user pressed enter in
  const handleEnter = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      switch (e.target.name) {
        case "weight":
          handleUpdateWeight();
          break;
        case "sets":
          handleUpdateSets();
          break;
        case "reps":
          handleUpdateReps();
          break;
        case "distance":
          handleUpdateDistance();
          break;
        case "time":
          handleUpdateTime();
          break;
        default:
          console.log("handleEnter did not find a valid input name");
      }
    }
  };
     
  // input value will be highlighted when the input is clicked for ease of editing
  const handleFocus = (e) => {
    e.currentTarget.select();
  };

  return (
    <Accordion.Item eventKey={activity._id} key={activity._id}>
      <Accordion.Header>{activity.name}</Accordion.Header>
      <Accordion.Body>
        { activity.type.toLowerCase() === "strength" ? (
          <Container>
            
            <Row className="text-center align-items-center">
              <Col md={3}>

                <div>Weight(lbs)</div>

                {isEditingWeight ? (
                  <input inputmode="numeric" name="weight" onChange={e => setEditedActivityWeight(e.target.value)} value={editedActivityWeight} onFocus={handleFocus} onKeyUp={handleEnter} onBlur={handleUpdateWeight} autoFocus style={{ width: "50px" }}/>
                ) : (
                  <div onClick={handleWeightClick}>{editedActivityWeight}</div>
                )}

              </Col>

              <Col md={3}>

                <div>Sets</div>
                {isEditingSets ? (
                  <input inputmode="tel" name="sets" onChange={e => setEditedActivitySets(e.target.value)} value={editedActivitySets} onFocus={handleFocus} onKeyUp={handleEnter} onBlur={handleUpdateSets} autoFocus style={{ width: "50px" }}/>
                ) : (
                  <div onClick={handleSetsClick}>{editedActivitySets}</div>
                )}
              
              </Col>

              <Col md={3}>

                <div>Reps</div>

                {isEditingReps ? (
                  <input name="reps" onChange={e => setEditedActivityReps(e.target.value)} value={editedActivityReps} onFocus={handleFocus} onKeyUp={handleEnter} onBlur={handleUpdateReps} autoFocus style={{ width: "50px" }}/>
                ) : (
                  <div onClick={handleRepsClick}>{editedActivityReps}</div>
                )}

              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            
              <Row className="text-center">
                <Col md={4}>
                  <div>Distance(mi)</div>

                  {isEditingDistance ? (
                  <input name="distance" onChange={e => setEditedActivityDistance(e.target.value)} value={editedActivityDistance} onFocus={handleFocus} onKeyUp={handleEnter} onBlur={handleUpdateDistance} autoFocus style={{ width: "50px" }}/>
                ) : (
                  <div onClick={handleDistanceClick}>{editedActivityDistance}</div>
                )}
            
                </Col>

                <Col md={4}>
                  <div>Time(min)</div>

                  {isEditingTime ? (
                  <input name="time" onChange={e => setEditedActivityTime(e.target.value)} value={editedActivityTime} onFocus={handleFocus} onKeyUp={handleEnter} onBlur={handleUpdateTime} autoFocus style={{ width: "50px" }}/>
                ) : (
                  <div onClick={handleTimeClick}>{editedActivityTime}</div>
                )}

                </Col>
              </Row>    
          </Container>
        )}
        <div>{activity.description}</div>
      </Accordion.Body>
    </Accordion.Item>
  ) 
};

export default WorkoutActivities;