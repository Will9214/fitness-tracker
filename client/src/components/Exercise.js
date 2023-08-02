import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Exercise = ({ id, name, type, muscle, equipment, difficulty, instructions }) => {

  const [showMore, setShowMore] = useState(false);
  const handleShowMoreClick = () => setShowMore(true);
  const handleShowLessClick = () => setShowMore(false);

  return (
    <ResultsContainer className="container">
      <Fragment>
        <Name><strong>Name:</strong> {name}</Name>
        <Type><strong>Type:</strong> {type}</Type>
        <Muscle><strong>Muscle:</strong> {muscle}</Muscle>
        <Equipment><strong>Equipment:</strong> {equipment}</Equipment>
        <Difficulty><strong>Difficulty:</strong> {difficulty}</Difficulty>
        {showMore ? (
        <Fragment>
          <FullInstructions><strong>Instructions:</strong> {instructions}</FullInstructions>
          <ShowLess onClick={handleShowLessClick}>...Show Less</ShowLess>
        </Fragment>
        ) : (
        <Fragment>
          <TruncatedInstructions><strong>Instructions:</strong> {instructions}</TruncatedInstructions>
          <ShowMore onClick={handleShowMoreClick}>...Show More</ShowMore>
        </Fragment>
        )}
      </Fragment>
    </ResultsContainer>
  )

};

export default Exercise;

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