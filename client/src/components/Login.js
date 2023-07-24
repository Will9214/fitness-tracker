import React from "react";
import styled from "styled-components";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


const userSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    // dispatchEvent(
    //   signin(data, () => {
    //     navigate("/home");
    //   })
    // );
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  }

  return (
    <LoginContainer>
      <Container>
        <h2 className="mb-3">Welcome! Are you ready to be great!</h2>
        <h4 className="mb-4">Log in or sign up now!</h4>

        <Form onSubmit={handleSubmit(handleFormSubmit)} className="col-md-4">

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" name="username" {...register("username", { required: true })} />
            {errors.username?.message}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" {...register("password", { required: true })} />
            {errors.password?.message}
          </Form.Group>

          <Form.Group as={Row} className="mb-3">

            <Col>
              <Button type="submit">Log In</Button>
            </Col>

            <Col>
              <Button onClick={handleSignUpClick}>Sign Up</Button>
            </Col>

          </Form.Group>
        </Form>
      </Container>
    </LoginContainer>
  )
};

export default Login;

const LoginContainer = styled.div`
  padding-top: 180px;
`;