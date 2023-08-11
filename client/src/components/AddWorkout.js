import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect } from "react";
import { getUserActivities } from "../redux/activities/activityActions";
import { addWorkoutThunk } from "../redux/workouts/workoutActions";

// object schema validation
const AddWorkoutSchema = Yup.object().shape({
  name: Yup.string().required(),
});

// displays a form to create a new workout
const AddWorkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activities } = useSelector(state => state.userActivities);
  const { userId } = useSelector(state => state.auth.user);

  // setup form validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(AddWorkoutSchema)
  });

  // Fetch userActivities on page refresh
  useEffect(() => {
    if (activities.length === 0) {
      dispatch(getUserActivities());
    } 
  });

  // dispatches add workout action when form is submitted and navigates to home
  const handleWorkoutFormSubmit = async (data) => {
    // dispatch(addWorkoutThunk({ data, userId }));
    // navigate("/home");


    try {
      const result = await dispatch(addWorkoutThunk({ data, userId })).unwrap();
     
      
      console.log("workout id", result.workout._id);
      
      const workoutId = result.workout._id;
      navigate(`/add_activities_to_workout/${workoutId}`);
      
    } catch (rejectedValueOrSerializedError) {

    };
    // navigate("/home");
  };

  // back button navigates home
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