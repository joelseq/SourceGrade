import styled from 'styled-components';

const ClassCard = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid rgba(51,51,51, 0.4);
  margin: 25px 0;
  padding: 25px;

  button {
    position: absolute;
    right: 5px;
    top: 5px;
    background: none;
    color: #FF0039;
    z-index: 1;
  }

  a {
    color: ${props => props.theme.primaryColor};
    text-decoration: none;
  }
`;

export default ClassCard;
