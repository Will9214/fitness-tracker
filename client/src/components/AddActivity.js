import React from "react";
import styled from "styled-components";
import { Form, Button, Col, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addActivityThunk } from "../redux/activities/activityActions";
import { useNavigate } from "react-router-dom";

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

const AddActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(AddActivitySchema)
  });

  const { userToken } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth.user);

  const handleActivityFormSubmit = (data) => {
    dispatch(addActivityThunk({ data, userId, userToken }));
    navigate("/home");
  };

  const handleBackClick = () => {
    navigate("/home");
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
              <Form.Select defaultValue="Choose..." name="type" {...register("type", {required: true })}>
                {errors.type?.message}
                <option>Choose...</option>
                <option>Strength</option>
                <option>Cardio</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridActivityDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter a description of your activity" name="description" {...register("description", { required: false })}/>
          </Form.Group>

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
`;

const FormContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
`;