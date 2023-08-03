import React from "react";
import { Button, CloseButton, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const ShowWorkouts = () => {


  return (
    <WorkoutsContainer>
      <div className="display-6 text-center">Workout List</div>
      <hr className="m-1" />

      <div className="p-1">
        <WorkoutContainer>
          <Row>
            <Col>Workout Name</Col>
            <Col md={2}>
              <CloseButton></CloseButton>
            </Col>
          </Row>
        </WorkoutContainer>
      </div>

      <Container className="text-center mt-2 mb-3">
        <Button>Create Workout</Button>
      </Container>
    </WorkoutsContainer>
  )

};

export default ShowWorkouts;

const WorkoutsContainer = styled.div`
  border: 1px solid black;
  height: auto;
  border-radius: 10px;
`;

const WorkoutContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 6px;
  &:hover {
    background-color: #e0e0e0;
  }
`;