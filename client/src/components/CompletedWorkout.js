import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

const CompletedWorkout = ({ workout }) => {
  
  const renderActivities = () => {
    if (workout.activities) {
      return workout.activities.map((activity) => (
        <Col className="text-center" sm={3} xs={4} key={activity._id}>
          <Row className="text-truncate">
            <strong>{activity.name}</strong>
            <hr className="mt-1 mb-1" />
          </Row>
          <Row>
            {activity.type.toLowerCase() === "strength" ? (
              <>
                <ActivityEntry>Weight(lbs): {activity.weight}</ActivityEntry>
                <ActivityEntry>Sets: {activity.sets}</ActivityEntry>
                <ActivityEntry>Reps: {activity.reps}</ActivityEntry>
              </>
            ) : (
              <>
                <ActivityEntry>Distance(mi): {activity.distance}</ActivityEntry>
                <ActivityEntry>Time(min): {activity.time}</ActivityEntry>
              </>
            )}
          </Row>
        </Col>
      ))
    }
  };


  return (
    <WorkoutContainer>
      <div className="text-center display-6">
        <strong>{workout.name}</strong>
      </div>
      <Row>
        {renderActivities()}
      </Row>
    </WorkoutContainer>
  )
};

export default CompletedWorkout;

const WorkoutContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding: 0 20px;
  padding-bottom: 5px;
  margin: 10px;

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

const ActivityEntry = styled.div`
  @media (max-width: 576px) {
    font-size: 11px;
  }
`;