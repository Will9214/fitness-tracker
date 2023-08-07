import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import ExerciseResults from "./ExerciseResults";
import { Container } from "react-bootstrap";

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
  padding-top: 180px;
`;