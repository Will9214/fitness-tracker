import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = () => {

  return (
    <Form className="row">
      <Form.Group>
        <Form.Label>Search for Exercise</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3 col-md-6">
        <Form.Control type="text" placeholder="Search" />
      </Form.Group>
        
      <Form.Group className="mb-3 col-md-3">
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

      <Form.Group className="mb-3 col-md-3">
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