import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Exercise from "./Exercise";

const ExerciseResults = () => {
  const { exercises } = useSelector(state => state.exerciseApi);
    
  if (exercises && exercises.length === 0) {
    return (
      <h4>No Exercises Found</h4>
    );
  };

  return (
    <div>
         {exercises?.map((exercise, i) => (
          <Exercise 
            key={i} 
            id={i} 
            name={exercise.name} 
            type={exercise.type}
            muscle={exercise.muscle}
            equipment={exercise.equipment}
            difficulty={exercise.difficulty}
            instructions={exercise.instructions}
          />
        ))}
    </div>    
  );
};

export default ExerciseResults;