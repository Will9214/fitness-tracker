import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchExercises } from "../redux/exerciseSearch/exerciseActions";

const SearchBar = () => {
  // set useState for name, type, muscle, and page?? data
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [page, setPage] = useState("1");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExercises(name, type, muscle));
  }, [name, type, muscle]);

  return (
    <Form className="row">
      <Form.Group>
        <Form.Label style={{ fontWeight: "700"}}>Search for Exercise, Choose Exercise Type, and/or Choose Muscle then hit Enter</Form.Label>
      </Form.Group>
      <Form.Group className="mb-1 col-md-6">
        <Form.Control type="text" placeholder="Search Exercise" />
      </Form.Group>
        
      <Form.Group className="mb-1 col-md-3">
        <Form.Select>
          <option>Choose a Type</option>
          <option>Cardio</option>
          <option>Olympic Weightlifting</option>
          <option>Plyometrics</option>
          <option>Powerlifting</option>
          <option>Strength</option>
          <option>Stretching</option>
          <option>Strongman</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-1 col-md-3">
        <Form.Select>
          <option>Choose a Muscle</option>
          <option>Abdominals</option>
          <option>Abductors</option>
          <option>Adductors</option>
          <option>Biceps</option>
          <option>Calves</option>
          <option>Chest</option>
          <option>Forearms</option>
          <option>Glutes</option>
          <option>Hamstrings</option>
          <option>Lats</option>
          <option>Lower Back</option>
          <option>Middle Back</option>
          <option>Neck</option>
          <option>Quadriceps</option>
          <option>Traps</option>
          <option>Triceps</option>
        </Form.Select>
      </Form.Group>
    </Form>
  )

};

export default SearchBar;