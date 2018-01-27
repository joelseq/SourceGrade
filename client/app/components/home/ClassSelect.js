import styled from 'styled-components';
import Select from 'react-select';

const ClassSelect = styled(Select)`
  min-width: 350px;
  max-width: 100%;
  margin-left: ${props => (props.inline ? '20' : '0')}px;
  margin-right: ${props => (props.inline ? '20' : '0')}px;
  height: 43px;
  text-align: left;

  .Select-control {
    height: 100%;
    border-radius: 0;
    padding-top: 5px;
  }

  @media (max-width: 480px) {
    margin: 0;
    min-width: 260px;
  }
`;

export default ClassSelect;
