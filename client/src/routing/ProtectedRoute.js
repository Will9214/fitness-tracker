import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!user) {
    return (
      <UnAuthContainer className='unauthorized'>
        <Container>
          <h1>Unauthorized!!</h1>
          <h5>
            Please <NavLink to="/">Login</NavLink> to gain access
          </h5>
        </Container>
      </UnAuthContainer>
    )
  }

  // returns child route elements
  return <Outlet />
};

export default ProtectedRoute;

const UnAuthContainer = styled.div`
  padding-top: 180px;
`;