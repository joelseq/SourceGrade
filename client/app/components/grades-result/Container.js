import styled from 'styled-components';

const Container = styled.div`
  background: white;
  width: 100%;
  text-align: center;
  height: auto;
  min-height: 200px;
  font-size: ${props => props.theme.fontSize * 1.2}px;
`;

export default Container;
