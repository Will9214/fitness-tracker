import React from "react";
import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const userSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Signup = () => {

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  const handleFormSubmit = (data) => {
    // dispatch(
    //   signup(data, () => {
    //     navigate("/home");
    //   })
    // );
  };

  const handleBackButton = () => {
    navigate("/");
  };


  return (
    <SignUpContainer>
      <Container>
        <h2 className="mb-3">Sign up below!!</h2>
        <h4 className="mb-4">Please fill out all the fields.</h4>

        <Form onSubmit={handleSubmit(handleFormSubmit)} className="col-md-4">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Create Username</Form.Label>
            <Form.Control type="text" placeholder="Username" name="username" {...register("username", { required: true })} />
            {errors.username?.message}
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Create Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" {...register("password", { required: true })}/>
            {errors.password?.message}
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button type="submit" >Sign Up</Button>
            </Col>
            <Col>
              <Button onClick={handleBackButton}>Back to Login</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </SignUpContainer>  
  )

};

export default Signup;

const SignUpContainer = styled.div`
  padding-top: 180px;
`;