import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Placeholder, Col, Row } from "react-bootstrap";
import { addActivityThunk } from "../redux/activities/activityActions";
import { useNavigate } from "react-router-dom";

// displays individual exercises results from the exercise search
const Exercise = ({ id, name, type, muscle, equipment, difficulty, instructions }) => {

  const { loading } = useSelector(state => state.exerciseApi);
  const { userId } = useSelector(state => state.auth.user);

  const [showMore, setShowMore] = useState(false);
  const handleShowMoreClick = () => setShowMore(true);
  const handleShowLessClick = () => setShowMore(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // dispatches add activity action to add a searched exercise as an activity
  // the different exercise types are converted to one of two activity types, 'strength' or 'cardio'
  const handleAddExerciseClick = () => {
    const data = {
      name: name,
      type: type === "cardio" ? "Cardio" : "Strength",
      description: instructions,
    };

    dispatch(addActivityThunk({ data, userId }));
    navigate("/home");
  };

  // will display placeholder components while results are still loading
  return (
    <>
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
        <Row>
        <Col sm={11} xs={11}>
        <>
          <Name><strong>Name:</strong> {name}</Name>
          <Type><strong>Type:</strong> {type}</Type>
          <Muscle><strong>Muscle:</strong> {muscle}</Muscle>
          <Equipment><strong>Equipment:</strong> {equipment}</Equipment>
          <Difficulty><strong>Difficulty:</strong> {difficulty}</Difficulty>
          {showMore ? (
          <>
            <FullInstructions><strong>Instructions:</strong> {instructions}</FullInstructions>
            <ShowLess onClick={handleShowLessClick}>...Show Less</ShowLess>
          </>
          ) : (
          <>
            <TruncatedInstructions><strong>Instructions:</strong> {instructions}</TruncatedInstructions>
            <ShowMore onClick={handleShowMoreClick}>...Show More</ShowMore>
          </>
        )}
        </>
        </Col>
        <Col sm={1} xs={1} className="p-0">
          <i id={id} onClick={handleAddExerciseClick} name={name} type={type} description={instructions} className="fa-regular fa-2x mt-2">&#xf0fe;</i>
        </Col>
        </Row>
      </ResultsContainer>
    )}
    </>
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