import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { styled } from "styled-components";


const ShowCompletedWorkouts = () => {
  const { completedWorkouts } = useSelector(state => state.userWorkouts);

  const renderUserCompletedWorkouts = () => {
    if (completedWorkouts) {
      return completedWorkouts.map((workout) => (
        <div key={workout._id} id={workout._id} className="p-2">
          <WorkoutContainer id={workout._id}>
            <Row>
              {workout.name}
            </Row>
            <Row>
              {workout.iat}
            </Row>
          </WorkoutContainer>
        </div>
      ))
    }
  }

  return (
    <CompletedWorkoutsContainer>
      <div className="display-6 text-center">Completed Workouts</div>
      <hr className="m-1" />

      {renderUserCompletedWorkouts()}

    </CompletedWorkoutsContainer>
  )
};

export default ShowCompletedWorkouts;

const CompletedWorkoutsContainer = styled.div``;

const WorkoutContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding-left: 20px;
  margin: 5px;
`;