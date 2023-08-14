import styled from "styled-components";
import SearchBar from "./SearchBar";
import ExerciseResults from "./ExerciseResults";
import { Container } from "react-bootstrap";

// displays screen to search for exercises
const SearchExercise = () => {
  return (
    <SearchContainer>
      <Container>
        <SearchBar />
        <ExerciseResults />
      </Container>
    </SearchContainer>
  )
};

export default SearchExercise;

const SearchContainer = styled.div`
  padding-top: 170px;
  padding-bottom: 70px;

  @media (max-width: 576px) {
    padding-top: 90px;
    font-size: 11px;
  }

  
`;