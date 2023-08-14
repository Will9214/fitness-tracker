import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Button, Row, Col } from "react-bootstrap";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserActivities } from "../redux/activities/activityActions";
import { updateActivity } from "../redux/activities/activityActions";
import { updateActivityReducer } from "../redux/activities/activitySlice";

// Displays individual Activity info when clicked from the activity list
const Activity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { activities } = useSelector(state => state.userActivities);

  // Fetch userActivities on page refresh
  useEffect(() => {
    if (activities.length === 0) {
      dispatch(getUserActivities());
    } 
  });
  
  // find activity from activityId given by the path parameters
  const location = useLocation();
  const path = matchPath("/activities/:activityId", location.pathname);
  const pathId = path.params.activityId;
  const activity = activities.find(activity => activity?._id === pathId);

  const activityId = activity?._id;

  // Not going to do ternary operator for this because there might be more activity types in the future
  // Display certain details of the activity depending on the activity type
  const renderActivityDataByType = () => {
    if (activity?.type.toLowerCase() === "strength") {
      return (
        <>
          <Row className="text-center"> 
            <Col className="col-md-4">
                  <FieldTitle>Weight(lbs): </FieldTitle>
  
                  {isEditing ? (
                    <input onChange={e => setEditedActivityWeight(e.target.value)} style={{ width: "50px" }} value={editedActivityWeight} onFocus={handleFocus}/>
                  ) : (
                    <div>{activity?.weight}</div>
                  )}          
            </Col>

            <Col className="col-md-4">
                  <FieldTitle>Sets: </FieldTitle>
                  
                  {isEditing ? (
                    <input onChange={e => setEditedActivitySets(e.target.value)} style={{ width: "50px" }} value={editedActivitySets} onFocus={handleFocus}/>
                  ) : (
                    <div>{activity?.sets}</div>
                  )}
            </Col>

            <Col className="col-md-4">
                  <FieldTitle>Reps: </FieldTitle>
                    
                  {isEditing ? (
                    <input onChange={e => setEditedActivityReps(e.target.value)} style={{ width: "50px" }} value={editedActivityReps} onFocus={handleFocus}/>
                  ) : (
                    <div>{activity?.reps}</div>
                  )}
            </Col>
          </Row>
          <hr />
        </>
      );
    } else if (activity?.type.toLowerCase() === "cardio") {
      return (
        <>
          <Row className="text-center">
            <Col className="col-md-6">
                  <FieldTitle>Distance(mi): </FieldTitle>
              
                  {isEditing ? (
                    <input onChange={e => setEditedActivityDistance(e.target.value)} style={{ width: "50px" }} value={editedActivityDistance} onFocus={handleFocus} />
                  ) : (
                    <div>{activity?.distance}</div>
                  )}
            </Col>

            <Col className="col-md-6">
                  <FieldTitle>Time(min): </FieldTitle>

                  {isEditing ? (
                    <input onChange={e => setEditedActivityTime(e.target.value)} value={editedActivityTime} onFocus={handleFocus} style={{ width: "50px" }}/>
                  ) : (
                    <div>{activity?.time}</div>
                  )}
            </Col>
          </Row>
          <hr />
        </>
      );
    }
  };

  // useState for toggling the inputs for editing the activity
  const [isEditing, setIsEditing] = useState(false);
  const handleEditActivityClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedActivityDistance(activity?.distance);
    setEditedActivityTime(activity?.time);
    setEditedActivityWeight(activity?.weight);
    setEditedActivitySets(activity?.sets);
    setEditedActivityReps(activity?.reps);
  };

  // using useState to manage updating values of the activity properties
  const [editedActivityDistance, setEditedActivityDistance] = useState(activity?.distance);
  const [editedActivityTime, setEditedActivityTime] = useState(activity?.time);
  const [editedActivityWeight, setEditedActivityWeight] = useState(activity?.weight);
  const [editedActivitySets, setEditedActivitySets] = useState(activity?.sets);
  const [editedActivityReps, setEditedActivityReps] = useState(activity?.reps);

  // value is highlighted when the input is clicked. allows easier editing for user
  const handleFocus = (e) => {
    e.currentTarget.select();
  };

  const handleBackClick = () => {
    navigate("/activities");
  };

  // dispatch updateActivity with the updated values when Save Changes button is clicked
  const handleEditedActivitySave = () => {
    dispatch(updateActivityReducer({ activityId, editedActivityDistance, editedActivityTime, editedActivityWeight, editedActivitySets, editedActivityReps}));
    dispatch(updateActivity({ activityId, editedActivityDistance, editedActivityTime, editedActivityWeight, editedActivitySets, editedActivityReps }));
    
    setIsEditing(false);
  };

  return(
    <ActivityScreen>
      <ActivityContainer className="col-md-8 offset-md-2">
        <div className="display-6 text-center">{activity?.name}</div>
        <hr className="m-1"/>

          <Container className="col-md-8 offset-md-2">

            <Row className="mb-2">
              <Col className="col-md-auto">
                <FieldTitle>
                  Type:
                </FieldTitle>
              </Col>
              <Col>
                <div>
                  {activity?.type}
                </div>
              </Col>
            </Row>
            <Row>
              <FieldTitle>
                Description:
              </FieldTitle>
                  
              <div className="text-break" style={{ paddingLeft: "30px"}}>
                {activity?.description}
              </div>      
            </Row>

            <hr/>

            {renderActivityDataByType()}

            <Container className="text-center mt-2 mb-3">
              
              {isEditing ? (
                <Row>
                  <Col>
                    <Button onClick={handleEditedActivitySave}>Save Changes</Button>
                  </Col>
                  <Col>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <Button onClick={handleEditActivityClick}>Edit</Button>
                  </Col>
                  <Col>
                    <Button onClick={handleBackClick}>Back</Button>
                  </Col>
                </Row>                
              )}
              
            </Container>
          </Container>
      </ActivityContainer>      
    </ActivityScreen>
  )
};

export default Activity;

const ActivityScreen = styled.div`
  padding-top: 180px;

  @media (max-width: 576px) {
    padding: 100px 10px;

  }
`;

const ActivityContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding-bottom: 5px;
  margin-bottom: 80px;
`;

const FieldTitle = styled.div`
  text-decoration: underline;
  font-weight: 700;
`;

