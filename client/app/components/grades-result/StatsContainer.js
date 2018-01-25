import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const StatsContainer = styled(Col)`
  margin: 50px auto;
  padding-left: 60px;
  color: ${props => props.theme.primaryColor};
  text-align: center;
  font-size: 1.2em;

  h4 {
    font-size: 0.85em;
  }

  h5 {
    font-size: 0.75em;
  }
`;

export default StatsContainer;
