import styled from "styled-components";

// gives space at the bottom of the view window
const Footer = () => {
  return (
    <FooterContainer></FooterContainer>
  )
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  height: 70px;
  background: #282c34;
  margin-top: 50px;
`;