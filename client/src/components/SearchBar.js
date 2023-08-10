import { useEffect, useRef, useState } from "react";
import { Form, Button, Overlay } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercises } from "../redux/exerciseSearch/exerciseActions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// displays search bar for third party exercise API
const SearchBar = () => {
  // set useState for name, type, muscle, and offset data
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // dispatches fetchExercises action whenever name, type, muscle, or offset has changed
  useEffect(() => {
    dispatch(fetchExercises({ name, type, muscle, offset }));
  }, [name, type, muscle, offset]);

  // calculate current page based on offset value
  // API returns 10 results per request
  // API does not give a total count value
  const currentPage = () => {
    if (offset === 0) {
      return 1;
    } else {
      return offset / 10 + 1;
    }
  };

  // handleNextClick will increase offset by 10 when clicked
  // pulling in exercises from redux state to get the length of the exercises array
  // if the length is less than 10 then it has reached the end of the results
  // no need to go to next page in that case
  // this does not take care of an instance where the results happen to end with exactly 10 results
  const exercises = useSelector(state => state.exerciseApi.exercises);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleNextClick = () => {
    if (exercises.length < 10) {
      setShow(!show);
      setTimeout(() => {
        setShow(false);
      }, "3000");
      return null;
    }
    setOffset(offset + 10);
  };

  // handlePreviousClick will decrease offset by 10 when clicked unless its at 0
  const handlePreviousClick = () => {
    if (offset === 0){
      return;
    }
    setOffset(offset - 10);
  };

  // setName and setOffset when name form is submitted
  const handleNameSubmit = e => {
    e.preventDefault();

    setName(e.target[1].value);
    setOffset(0);

    e.target[1].value = "";
  };

  // setType value when a type has been selected/changed
  const handleTypeSelect = e => {
    if (e.target.value !== "Choose a Type") {
      setType(e.target.value);
      setOffset(0);
    } else {
      setType("");
    }
  };

  // setMuscle value when a type has been selected/changed
  const handleMuscleSelect = e => {
    if (e.target.value !== "Choose a Muscle") {
      setMuscle(e.target.value);
      setOffset(0);
    } else {
      setMuscle("");
    }
  };

  // clear search will clear the current name, type, muscle, offset values, and search bar
  const handleClearSearch = () => {
    setName("");
    setType("");
    setMuscle("");
    setOffset(0);
  }

  // home button will navigate to home
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <Form className="row" onSubmit={handleNameSubmit}>
      <Form.Group className="col-md-11">
        <Form.Label style={{ fontWeight: "700", fontSize: "1.5rem"}}>Search for Exercise and press Enter, Choose Exercise Type, and/or Choose Muscle.</Form.Label>
        <Form.Label>If you find an exercise you like, click the plus symbol in the top, right corner of the individual results to add it to your Activity List.</Form.Label>
      </Form.Group>
      <div className="col-md-1">
        <Button onClick={handleHomeClick}>Home</Button>
      </div>
      <Form.Group className="mb-1 col-md-6">
        <Form.Control type="text" placeholder="Search Exercise" />
      </Form.Group>
        
      <Form.Group className="mb-1 col-md-3">
        <Form.Select placeholder="Choose a Type" value={type} onChange={handleTypeSelect}>
          <option>Choose a Type</option>
          <option>Cardio</option>
          <option>Plyometrics</option>
          <option>Powerlifting</option>
          <option>Strength</option>
          <option>Stretching</option>
          <option>Strongman</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-1 col-md-3">
        <Form.Select placeholder="Choose a Muscle" value={muscle} onChange={handleMuscleSelect}>
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
      <div className="d-flex justify-content-between mt-2 align-items-center">
        <Button onClick={handlePreviousClick}>Previous</Button>
        
        {/* This needs to be cleaned up at some point. Maybe add columns
        instead of d-flex justify-content-between */}
        {name || type || muscle ? (
          <>
            <div>
              <strong>Current Search:</strong> Name - {name ? name: "Any"}, Type - {type ? type : "Any"}, Muscle - {muscle ? muscle : "Any"}
            </div>

            <ClearSearch onClick={handleClearSearch}>Clear Search</ClearSearch>
          </>
        ) : (null)}
        <div style={{ fontSize: "1.3rem", fontWeight: "700"}}>Page: {currentPage()}</div>
        <Button onClick={handleNextClick} ref={target}>Next</Button>
        <Overlay target={target.current} show={show} placement="left">
          <div style={{ position: "absolute", backgroundColor: "blue", padding: "2px 10px", color: "white", borderRadius: 3 }}>No More Results!</div>
        </Overlay>
      </div>
    </Form>
  )

};

export default SearchBar;

const ClearSearch = styled.div`
  font-weight: 700;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;