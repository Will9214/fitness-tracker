import React from "react";
import styled from "styled-components";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShowActivities = () => {
  const navigate = useNavigate();

  const { activities } = useSelector(state => state.userActivities);

  const handleAddActivityClick = () => {
    navigate("/add_activity");
  };

  return (
    <ActivitiesContainer>
      <div className="display-6 text-center">Activities</div>
      <hr className="m-0"/>


      {activities.map((activity) => (
        <div key={activity._id} id={activity._id} className="p-3">
          <ActivityContainer>
            {activity.name}
          </ActivityContainer>
        </div>
      ))}   

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
  padding: 10px;
`;