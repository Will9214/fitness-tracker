import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getUserActivities } from "../redux/activities/activityActions";
import { addWorkoutThunk } from "../redux/workouts/workoutActions";


const AddWorkoutSchema = Yup.object().shape({
  name: Yup.string().required(),
  
});

const AddWorkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activities } = useSelector(state => state.userActivities);
  const { userId } = useSelector(state => state.auth.user);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(AddWorkoutSchema)
  });

  // Fetch userActivities on page refresh
  useEffect(() => {
    if (activities.length === 0) {
      dispatch(getUserActivities());
    } 
  });

  const handleWorkoutFormSubmit = (data) => {
    dispatch(addWorkoutThunk({ data, userId }));
    navigate("/home");
  };

  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <AddWorkoutContainer className="container">
      <FormContainer className="col-md-8 offset-md-2">
        <h3 className="text-center">Create a Workout</h3>
        <hr />
        <Form onSubmit={handleSubmit(handleWorkoutFormSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridWorkoutName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter a Name for your Workout" name="name" {...register("name", { required: true })} />
              {errors.name?.message}
            </Form.Group>
          </Row>
          
          <Row className="text-center">
            <Col>
              <Button type="submit">
                Submit
              </Button>
            </Col>
            <Col>
              <Button onClick={handleBackClick}>
                Back
              </Button>
            </Col>
          </Row>

        </Form>
      </FormContainer>
    </AddWorkoutContainer>
  )  
};

export default AddWorkout;

const AddWorkoutContainer = styled.div`
  padding-top: 180px;
`;

const FormContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
`;

const SelectActivities = styled.div`
  border: 1px solid black;
  height: 186px;
  overflow-y: auto;
`;

const PlusButton = styled.div`
  cursor: pointer;
  &:hover {
    background: grey;
  }
`;

const AddedActivities = styled.div`
 border: 1px solid black;
 height: 186px;
`;

const ActivityContainer = styled.div`
  border: 1px solid black;
  padding: 6px;
`;