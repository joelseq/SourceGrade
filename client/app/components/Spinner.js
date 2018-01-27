import React from 'react';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  margin: 20% auto;
  color: ${props => props.theme.accentColor};
`;

const Spinner = () => (
  <Wrapper>
    <FontAwesome
      name="circle-o-notch"
      size="3x"
      spin
    />
  </Wrapper>
);

export default Spinner;
