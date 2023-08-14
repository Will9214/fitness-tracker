import { useEffect } from "react";
import styled from "styled-components";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { signIn } from "../redux/auth/authActions";

// object schema validation
const userSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

// displays login screen with form for user login
const Login = () => {

  const { loading, user, error } = useSelector((state) => state.auth);
  console.log(loading);
  

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // navigate to home screen if user is signed in
  useEffect(() => {
    if (user) {
      navigate("/home")
    }
  }, [navigate, user]);

  // dispatches sign in action when login form is submitted
  const handleFormSubmit = (data) => {
    dispatch(signIn(data));
  };

  // displays message if login is invalid
  const renderSubmitError = () => {
    if (error === 401) {
      return (
        <ErrorContainer className="col-md-4 mb-2">
          <ErrorMessage>Please provide a valid username and password.</ErrorMessage>
        </ErrorContainer>      
      )  
    } else {
      return null;
    }
  };

  // navigates to sign up screen
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // function to capitalize first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <LoginContainer>
      <Container>
        <h2 className="mb-3">Welcome! Are you ready to be great!</h2>
        <h4 className="mb-4">Log in or sign up now!</h4>

        {renderSubmitError()}

        <>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Form onSubmit={handleSubmit(handleFormSubmit)} className="col-md-4">

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" name="username" {...register("username", { required: true })} />
                <div style={{ color: "red" }}>{errors.username?.message ? "*" + capitalizeFirstLetter(errors.username?.message) : null}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" {...register("password", { required: true })} />
                <div style={{ color: "red" }}>{errors.password?.message ? "*" + capitalizeFirstLetter(errors.password?.message) : null}</div>
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
          )}
        </>
      </Container>
    </LoginContainer>
  )
};

export default Login;

const LoginContainer = styled.div`
  padding-top: 180px;

  @media (max-width: 576px) {
    padding-top: 90px;
  }
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