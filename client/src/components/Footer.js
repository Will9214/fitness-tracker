import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// gives space at the bottom of the view window
const Footer = () => {
  const navigate = useNavigate();

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

  return (
    <FooterContainer className="fixed-bottom">
      <NavRow className="row text-center">
        <NavColumn onClick={handleHomeClick} className="col-3">Home</NavColumn>
        <NavColumn onClick={handleActivitiesClick} className="col-3">Activities</NavColumn>
        <NavColumn onClick={handleWorkoutsClick} className="col-3">Workouts</NavColumn>
        <NavColumn onClick={handleSearchClick} className="col-3">Search</NavColumn>
      </NavRow>
    </FooterContainer>
  )
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  height: 50px;
  background: #282c34;
  margin-top: 50px;
  color: white;
`;

const NavRow = styled.div`
  height: 100%;
  
`;

const NavColumn = styled.div`
  border: 1px solid white;
  &:hover {
    background-color: #768299;
  }
`;