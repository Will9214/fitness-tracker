import React, { useEffect } from "react";
import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/auth/authActions";

const userSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Signup = () => {

  const { loading, userInfo, error, success } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  useEffect(() => {
    // redirect user to login if signup is successful
    if (success) navigate("/")
    
    // redirect authenticated user to home
    if (userInfo) navigate("/home")
  }, [navigate, userInfo, success]);

  const handleFormSubmit = (data) => {
    dispatch(signUp(data));
  };

  const renderSubmitError = () => {
    if (error) {
      return (
        <ErrorContainer className="col-md-4 mb-2">
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>      
      )  
    } else {
      return null;
    }
  };

  const handleBackButton = () => {
    navigate("/");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <SignUpContainer>
      <Container>
        <h2 className="mb-3">Sign up below!!</h2>
        <h4 className="mb-4">Please fill out all the fields.</h4>

        {renderSubmitError()}

        <Form onSubmit={handleSubmit(handleFormSubmit)} className="col-md-4">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Create Username</Form.Label>
            <Form.Control type="text" placeholder="Username" name="username" {...register("username", { required: true })} />
            <div style={{ color: "red" }}>{errors.username?.message ? "*" + capitalizeFirstLetter(errors.username?.message) : null}</div>
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Create Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" {...register("password", { required: true })}/>
            <div style={{ color: "red" }}>{errors.password?.message ? "*" + capitalizeFirstLetter(errors.password?.message) : null}</div>
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

const ErrorContainer = styled.div`
  border: 1px solid #ff9b99;
  border-radius: 5px;
  background-color: #fad1d0;
`;

const ErrorMessage = styled.div`
  padding: 10px;
  color: #940128;
`;