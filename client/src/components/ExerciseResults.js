import { useSelector } from "react-redux";
import Exercise from "./Exercise";

// displays all exercise results, 10 results at a time
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