import React from "react";
import styled from "styled-components";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShowActivities = () => {
  const navigate = useNavigate();

  const handleAddActivityClick = () => {
    navigate("/add_activity");
  };

  return (
    <ActivityContainer>
      <div className="display-6 text-center">Activities</div>
      <hr className="m-0"/>

      <Container className="text-center mt-2">
        <Button onClick={handleAddActivityClick}>Add Activity</Button>
      </Container>
      
    </ActivityContainer>
  )
};

export default ShowActivities;

const ActivityContainer = styled.div`
  border: 1px solid black;
  height: 250px;
  border-radius: 10px;
`;