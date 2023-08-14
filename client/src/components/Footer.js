import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// gives space at the bottom of the view window
const Footer = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [isHome, setIsHome] = useState(false);
  const [isActivities, setIsActivities] = useState(false);
  const [isWorkouts, setIsWorkouts] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const path = window.location.pathname;


  const handleHomeClick = () => {    
    navigate("/home");
  };

  const handleActivitiesClick = () => {
    navigate("/activities");
  };

  const handleWorkoutsClick = () => {
    navigate("/workouts");
  };

  const handleSearchClick = () => {
    navigate("/search_exercise");
  };

  const renderNavigation = () => {
    if (user) {
      return (
        <NavRow className="row text-center">
          <NavColumn onClick={handleHomeClick} className="col-3">Home</NavColumn>
          <NavColumn onClick={handleActivitiesClick} className="col-3">Activities</NavColumn>
          <NavColumn onClick={handleWorkoutsClick} className="col-3">Workouts</NavColumn>
          <NavColumn onClick={handleSearchClick} className="col-3">Search</NavColumn>
        </NavRow>
      )
    }
  };

  return (
    <FooterContainer className="fixed-bottom">
      {renderNavigation()}
    </FooterContainer>
  )
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  height: 40px;
  background: #282c34;
  margin-top: 50px;
  color: white;

  @media (min-width: 576px) {
    top: 150px;
    margin-top: 0px;
    font-weight: 700;
  }
`;

const NavRow = styled.div`
  height: 100%;
`;

const NavColumn = styled.div`
  padding-top: 6px;
  border: 1px solid white;
  &:hover {
    background-color: #768299;
  }
`;