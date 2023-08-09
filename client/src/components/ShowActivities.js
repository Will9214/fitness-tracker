import styled from "styled-components";
import { Button, Container, Row, Col, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeActivityThunk } from "../redux/activities/activityActions";

// displays user's activities in a list
const ShowActivities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activities } = useSelector(state => state.userActivities);

  // navigates to the individual activity's screen when activity is clicked
  const handleActivityClick = (e) => {
    if (e.target.ariaLabel !== "remove") {
      const activityId = e.currentTarget.id;
      navigate(`/activities/${activityId}`);
    }
  };

  // dispatches activity delete action when X is clicked
  const handleActivityDeleteClick = (e) => {
    if (e.target.ariaLabel === "remove") {
      const activityId = e.currentTarget.id;
      dispatch(removeActivityThunk({ activityId }));
    }
  };

  // renders list of user activities
  const renderUserActivities = () => {
    if (activities) {
      return activities.map((activity) => (
        <div key={activity._id} id={activity._id} className="p-1">
          <ActivityContainer id={activity._id} onClick={handleActivityClick}>
            <Row>
              <Col>
                {activity.name}
              </Col>
              <Col md={2}>
                <CloseButton id={activity._id} onClick={handleActivityDeleteClick} aria-label="remove"/>
              </Col>
            </Row>
          </ActivityContainer>
        </div>
      ))
    }
  }

  // navigates to add activity screen when clicked
  const handleAddActivityClick = () => {
    navigate("/add_activity");
  };

  return (
    <ActivitiesContainer>
      <div className="display-6 text-center">Activity List</div>
      <hr className="m-1"/>

      {renderUserActivities()}

      <Container className="text-center mt-2 mb-3">
        <Button onClick={handleAddActivityClick}>Create Activity</Button>
      </Container>
    </ActivitiesContainer>
  )
};

export default ShowActivities;

const ActivitiesContainer = styled.div`
  height: auto;
  box-shadow: 2px 2px 5px;
  padding-bottom: 1px;
`;

const ActivityContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding: 6px;
  &:hover {
    background-color: #e0e0e0;
  };
  margin: 0 5px;
`;