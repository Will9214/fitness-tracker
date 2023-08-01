import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ExerciseResults = () => {
 
  const exercises = useSelector(state => state.exerciseApi.exercises);

  const RenderExerciseList = () => {
    const [showMore, setShowMore] = useState(false);
    const handleShowMoreClick  = () => setShowMore(true);
    const handleShowLessClick = () => setShowMore(false);

    if (exercises && exercises.length === 0) {
      return (
        <h4>No Exercises Found</h4>
      );
    };

    // render exercise info for each of the exercises fetched
    if (exercises) {
      return exercises.map((exercise, i) => {
        return (
          <ResultsContainer className="container" key={i}>
            <Fragment>
              <Name><strong>Name:</strong> {exercise.name}</Name>
              <Type><strong>Type:</strong> {exercise.type}</Type>
              <Muscle><strong>Muscle:</strong> {exercise.muscle}</Muscle>
              <Equipment><strong>Equipment:</strong> {exercise.equipment}</Equipment>
              <Difficulty><strong>Difficulty:</strong> {exercise.difficulty}</Difficulty>
              {showMore ? (
              <Fragment>
                <FullInstructions><strong>Instructions:</strong> {exercise.instructions}</FullInstructions>
                <ShowLess onClick={handleShowLessClick}>...Show Less</ShowLess>
              </Fragment>
              ) : (
              <Fragment>
                <TruncatedInstructions><strong>Instructions:</strong> {exercise.instructions}</TruncatedInstructions>
                <ShowMore onClick={handleShowMoreClick}>...Show More</ShowMore>
              </Fragment>
              )}
            </Fragment>
          </ResultsContainer>
        )
      })
    }
  }

  return (
    <div>
      {RenderExerciseList()}
    </div>    
  );
};

export default ExerciseResults;

const ResultsContainer = styled.div`
  margin: 15px 0;
  box-shadow: 2px 2px 5px;
`;

const Name = styled.div`

`;

const Type = styled.div`

`;

const Muscle = styled.div`

`;

const Equipment = styled.div`

`;

const Difficulty = styled.div`

`;

const TruncatedInstructions = styled.div`
  height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FullInstructions = styled.div`
`;

const ShowMore = styled.div`
  font-weight: 600;
  width: fit-content;
  padding-left: 10px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ShowLess = styled.div`
  font-weight: 600;
  width: fit-content;
  padding-left: 10px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
