import { useState } from "react";
import styled from "styled-components";
import { Form, Button, Col, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addActivityThunk } from "../redux/activities/activityActions";
import { useNavigate } from "react-router-dom";

// object schema validation
const AddActivitySchema = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().required(),
  description: Yup.string(),
  time: Yup.string(),
  distance: Yup.number(),
  weight: Yup.number(),
  sets: Yup.number(),
  reps: Yup.number(),
});

// Displays a form to create a new activity
const AddActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form validation 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(AddActivitySchema)
  });

  const { userToken } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth.user);

  // dispatches add activity action when form is submitted
  const handleActivityFormSubmit = (data) => {
    dispatch(addActivityThunk({ data, userId, userToken }));
    navigate("/activities");
  };

  // back button navigates to home
  const handleBackClick = () => {
    navigate("/activities");
  };

  // Display specific form inputs depending on type of activity selected
  const [activityType, setActivityType] = useState("");
  
  const handleSelectType = (e) => {
    setActivityType(e.currentTarget.value);
  };

  const renderActivityInputsByType = () => {
    if (activityType === "Strength") {
      return (
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridWeight">
            <Form.Label>Weight Lifted</Form.Label>
            <Form.Control type="text" placeholder="Enter weight" name="weight" {...register("weight", { required: false })}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSets">
            <Form.Label>Sets</Form.Label>
            <Form.Control type="text" placeholder="Enter number of sets" name="sets" {...register("sets", { required: false })} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridReps">
            <Form.Label>Reps</Form.Label>
            <Form.Control type="text" placeholder="Enter number of reps" name="reps" {...register("reps", { required: false })}/>
          </Form.Group>
        </Row>
      )
    } else if (activityType === "Cardio") {
      return (
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control type="text" placeholder="Enter duration of activity" name="time" {...register("time", { required: false })}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDistance">
            <Form.Label>Distance</Form.Label>
            <Form.Control type="text" placeholder="Enter distance" name="distance" {...register("distance", { required: false })} />
          </Form.Group>
        </Row>
      )
    } else {
      return null;
    }
  };

  return(
    <AddActivityContainer className="container">
      <FormContainer className="col-md-8 offset-md-2">
        <h3 className="text-center">Create an Activity</h3>
        <hr />
        <Form onSubmit={handleSubmit(handleActivityFormSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridActivityName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter activity name" name="name" {...register("name", { required: true })} />
              {errors.name?.message}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridActivityType">
              <Form.Label>Type</Form.Label>
              <Form.Select defaultValue="Choose..." name="type" {...register("type", {required: true })} onChange={handleSelectType}>
                {errors.type?.message}
                <option value="">Choose...</option>
                <option value ="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridActivityDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter a description of your activity" name="description" {...register("description", { required: false })}/>
          </Form.Group>

          {renderActivityInputsByType()}
          
          <Row className="text-center">
            <Col>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={handleBackClick}>
                Back
              </Button>
            </Col>        
          </Row>
  
        </Form> 
      </FormContainer>
    </AddActivityContainer>
  )
};

export default AddActivity;

const AddActivityContainer = styled.div`
  padding-top: 180px;
  padding-bottom: 120px;

  @media (max-width: 576px) {
    padding-top: 100px;
    padding-bottom: 75px;
  }
`;

const FormContainer = styled.div`
  box-shadow: 2px 2px 5px;
  padding: 20px;
`;