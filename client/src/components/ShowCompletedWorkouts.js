import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CompletedWorkout from "./CompletedWorkout";


const ShowCompletedWorkouts = () => {
  const { completedWorkouts } = useSelector(state => state.userWorkouts);

  return (
    <CompletedWorkoutsContainer className="col-sm-6 offset-sm-3">
      <div className="display-6 text-center">Completed Workouts</div>
      <hr className="m-1" />

      {completedWorkouts?.map((workout, i) => (
        <CompletedWorkout
          key={workout._id}
          id={workout._id}
          workout={workout}
        />
      ))}

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