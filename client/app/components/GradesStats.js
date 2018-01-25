import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import { mean, median, stdev } from 'stats-lite';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const Container = styled.div`
  @include depth-shadow;
  background: white;
  width: 100%;
  text-align: center;
  height: auto;
  min-height: 200px;
  font-size: ${props => props.theme.fontSize * 1.2}px;
`;

const StatsContainer = styled(Col)`
  margin: 50px auto;
  padding-left: 60px;
  color: ${props => props.theme.primaryColor};
  text-align: center;
`;

const GradesStats = ({ assessment }) => {
  if (!assessment) {
    return (
      <Container>
        <h5>Click on an Assessment or Category to begin.</h5>
      </Container>
    );
  }

  // Array for storing frequencies for each percentage bucket
  const frequencies = new Array(10);
  // Initialize all values in the array to 0
  frequencies.fill(0);
  // Get the maximum score possible for the assessment
  const maxVal = parseInt(assessment.Score.split('/ ')[1], 10);
  // Divider that splits values into 10 buckets
  const divider = parseFloat(maxVal / 10);
  // Map each score to a bucket
  assessment.scores.forEach((score) => {
    let index = Math.floor(score / divider);
    if (index > frequencies.length - 1) {
      index = frequencies.length - 1;
    }
    frequencies[index] += 1;
  });

  // Used to create labels for the buckets (eg. 10% - 20%)
  const labels = frequencies.map((freq, i) => {
    if (i !== frequencies.length - 1) {
      return `${i * 10}% - ${((i + 1) * 10) - 1}%`;
    }
    return `${i * 10}% - ${(i + 1) * 10}%`;
  });

  const data = [['Score', 'No. of students']];

  for (let i = 0; i < labels.length; i++) {
    data.push([labels[i], frequencies[i]]);
  }

  const options = {
    title: 'Histogram of Scores',
    hAxis: { title: 'Scores' },
    colors: ['#110070'],
    bar: {
      groupWidth: '95%',
    },
  };

  // Create a copy of scores array and sort it in ascending order
  // using a comparator function
  const sortedScores = [...assessment.scores].sort((a, b) => a - b);
  const max = sortedScores[sortedScores.length - 1];
  const min = sortedScores[0];

  return (
    <Container>
      <Row>
        <h3>{assessment.name}</h3>
        <StatsContainer md={5}>
          <Row>
            <Col sm={6}>
              <h5>Class Scores:</h5>
              <h6>Max: {max}</h6>
              <h6>Min: {min}</h6>
              <h6>Mean: {mean(assessment.scores).toFixed(2)}</h6>
              <h6>Median: {median(assessment.scores).toFixed(2)}</h6>
              <h6>Standard Deviation: {stdev(assessment.scores).toFixed(2)}</h6>
            </Col>
            <Col sm={6}>
              <h5>You:</h5>
              {assessment.Rank && <h6>Rank: {assessment.Rank} / {assessment.scores.length}</h6>}
              {assessment.Score && <h6>Score: {assessment.Score}</h6>}
              {assessment.Points && <h6>Points: {assessment.Points}</h6>}
            </Col>
          </Row>
        </StatsContainer>
        <Col md={7}>
          <Chart
            chartType="ColumnChart"
            data={data}
            options={options}
            graph_id="ColumnChart"
            width="100%"
            height="400px"
          />
        </Col>
      </Row>
    </Container>
  );
};

GradesStats.propTypes = {
  assessment: PropTypes.shape({
    name: PropTypes.string,
    Rank: PropTypes.string,
    scores: PropTypes.arrayOf(PropTypes.number),
    Points: PropTypes.string,
    Score: PropTypes.string,
  }),
};

GradesStats.defaultProps = {
  assessment: null,
};

export default GradesStats;
