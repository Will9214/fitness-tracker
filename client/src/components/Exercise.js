import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Placeholder } from "react-bootstrap";

const Exercise = ({ id, name, type, muscle, equipment, difficulty, instructions }) => {

  const { loading } = useSelector(state => state.exerciseApi);

  const [showMore, setShowMore] = useState(false);
  const handleShowMoreClick = () => setShowMore(true);
  const handleShowLessClick = () => setShowMore(false);
  // const [isLoading, setLoading] = useState(loading);

  return (
    <Fragment>
    {loading ? (
      <ResultsContainer className="container">
        <Placeholder as={Name} animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as={Type} animation="glow">
          <Placeholder xs={3}/>
        </Placeholder>
        <Placeholder as={Muscle} animation="glow">
          <Placeholder xs={3}/>
        </Placeholder>
        <Placeholder as={Equipment} animation="glow">
          <Placeholder xs={3}/>
        </Placeholder>
        <Placeholder as={Difficulty} animation="glow">
          <Placeholder xs={3}/>
        </Placeholder>
        <Placeholder as={TruncatedInstructions} animation="glow">
          <Placeholder xs={11}/>
        </Placeholder>
      </ResultsContainer>
    ) : (
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
    )}
    </Fragment>

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