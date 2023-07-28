import React, { useState } from "react";
import styled from "styled-components";
import { Button, Container, Row, Col, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeActivityThunk } from "../redux/activities/activityActions";

const ShowActivities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken } = useSelector(state => state.auth);
  const { activities } = useSelector(state => state.auth.user);
  const [ userActivities, setUserActivities] = useState(activities);

  const handleActivityDeleteClick = (e) => {
    const activityId = e.currentTarget.id;
    dispatch(removeActivityThunk({ activityId, userToken }))
  };

  const renderUserActivities = () => {
    if (activities) {
      return userActivities.map((activity) => (
        <div key={activity._id} id={activity._id} className="p-1">
          <ActivityContainer>
            <Row>
              <Col>
                {activity.name}
              </Col>
              <Col md={2}>
                <CloseButton id={activity._id} onClick={handleActivityDeleteClick}/>
              </Col>
            </Row>
            
            
          </ActivityContainer>
        </div>
      ))
    }
  }

  const handleAddActivityClick = () => {
    navigate("/add_activity");
  };

  return (
    <ActivitiesContainer>
      <div className="display-6 text-center">Activities</div>
      <hr className="m-1"/>

      {renderUserActivities()}

      <Container className="text-center mt-2 mb-3">
        <Button onClick={handleAddActivityClick}>Add Activity</Button>
      </Container>
      
    </ActivitiesContainer>
  )
};

export default ShowActivities;

const ActivitiesContainer = styled.div`
  border: 1px solid black;
  height: auto;
  border-radius: 10px;
`;

const ActivityContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 6px;
`;