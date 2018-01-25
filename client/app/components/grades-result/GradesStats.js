import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import { mean, median, stdev } from 'stats-lite';
import { Row, Col } from 'react-bootstrap';

import Container from './Container';
import StatsContainer from './StatsContainer';

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
              <h4>Class Scores:</h4>
              <h5>Max: {max}</h5>
              <h5>Min: {min}</h5>
              <h5>Mean: {mean(assessment.scores).toFixed(2)}</h5>
              <h5>Median: {median(assessment.scores).toFixed(2)}</h5>
              <h5>Std Dev: {stdev(assessment.scores).toFixed(2)}</h5>
            </Col>
            <Col sm={6}>
              <h5>You:</h5>
              {assessment.Rank && <h5>Rank: {assessment.Rank} / {assessment.scores.length}</h5>}
              {assessment.Score && <h5>Score: {assessment.Score}</h5>}
              {assessment.Points && <h5>Points: {assessment.Points}</h5>}
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
