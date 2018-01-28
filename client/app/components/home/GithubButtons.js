import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 15px;

  iframe {
    margin-left: 10px;
  }
`;


const GithubButtons = () => (
  <Container>
    <iframe
      title="star"
      src="https://ghbtns.com/github-btn.html?user=joelseq&repo=SourceGrade&type=star&count=true&size=large"
      frameBorder="0"
      scrolling="0"
      width="120px"
      height="30px"
    />
    <iframe
      title="fork"
      src="https://ghbtns.com/github-btn.html?user=joelseq&repo=SourceGrade&type=fork&count=true&size=large"
      frameBorder="0"
      scrolling="0"
      width="99px"
      height="30px"
    />
  </Container>
);

export default GithubButtons;
