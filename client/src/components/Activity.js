import React, { useEffect } from "react";
import styled from "styled-components";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserActivities } from "../redux/activities/activityActions";


const Activity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const { activities } = useSelector(state => state.userActivities);

  // Trying to get state to refetch on page refresh
  // if (activities === []) {
  //   getUserActivities();
  // }

  const location = useLocation();
  const path = matchPath("/activities/:activityId", location.pathname);
  const pathId = path.params.activityId;
  const activity = activities.find(activity => activity._id === pathId);



  const handleBackClick = () => {
    navigate("/home");
  }

  return(
    <div style={{ paddingTop: "180px" }}>
      <ActivityContainer className="col-md-8 offset-md-2">
        <div className="display-6 text-center">{activity.name}</div>
        <hr className="m-1"/>

          <Container className="col-md-8 offset-md-2">

            <Row>
              <Col className="col-md-auto">
                <FieldTitle>
                  Type:
                </FieldTitle>
                <FieldTitle>
                  Description:
                </FieldTitle>
              </Col>
              <Col className="col-md-auto">
                <div>
                  {activity.type}
                </div>
                <div>
                  {activity.description}
                </div>
              </Col>
            </Row>

            <hr/>

            <Row>
              <Col className="col-md-6">
                <Row>
                  <Col className="col-md-auto">
                    <FieldTitle>Distance: </FieldTitle>
                  </Col>
                  <Col className="col-md-auto">
                    <div>{activity.distance}</div>
                  </Col>
                </Row>
              </Col>

              <Col className="col-md-6">
                <Row>
                  <Col className="col-md-auto">
                    <FieldTitle>Time: </FieldTitle>
                  </Col>
                  <Col className="col-md-auto">
                    <div>{activity.time}</div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col className="col-md-4">
                <Row>
                  <Col className="col-md-auto">
                    <FieldTitle>Weight: </FieldTitle>
                  </Col>
                  <Col className="col-md-auto">
                    <div>{activity.weight}</div>
                  </Col>
                </Row>
              </Col>
              <Col className="col-md-4">
                <Row>
                  <Col className="col-md-auto">
                    <FieldTitle>Sets: </FieldTitle>
                  </Col>
                  <Col className="col-md-4">
                    <div>{activity.sets}</div>
                  </Col>
                </Row>
              </Col>
              <Col className="col-md-4">
                <Row>
                  <Col className="col-md-auto">
                    <FieldTitle>Reps: </FieldTitle>
                  </Col>
                  <Col className="col-md-auto">
                    <div>{activity.reps}</div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <hr />

          </Container>

     
        

        <Container className="text-center mt-2 mb-3">
          <Row>
            <Col>
              <Button>Edit</Button>
            </Col>
            <Col>
              <Button onClick={handleBackClick}>Back</Button>
            </Col>
            
          </Row>

        </Container>
    
      </ActivityContainer>      
    </div>
  )
};

export default Activity;

const ActivityContainer = styled.div`
  border: 1px solid black;
  height: auto;
  border-radius: 10px;
`;

const FieldTitle = styled.div`
  text-decoration: underline;
`;

