import React, { Component } from 'react';
import { mean, median, mode, stdev } from 'stats-lite';

class GradesStats extends Component {
  render() {
    const { assessment } = this.props;

    if(!assessment) {
      return (
        <div className="chart-container">
          <h5 className="pre-stats-text">Click on an Assessment or Category to begin.</h5>
        </div>
      );
    }

    return (
      <div className="chart-container">
        <div className="row">
          <div className="columns small-6 small-centered stats-container">
            <div className="row">
              <h5>{assessment.name}</h5>
              <div className="columns small-6">
                <h6>Mean: {mean(assessment.scores).toFixed(2)}</h6>
                <h6>Median: {median(assessment.scores).toFixed(2)}</h6>
                <h6>Mode: {mode(assessment.scores).toFixed(2)}</h6>
                <h6>Standard Deviation: {stdev(assessment.scores).toFixed(2)}</h6>
              </div>
              <div className="columns small-6">
                {assessment.Rank && <h6>Your Rank: {assessment.Rank} / {assessment.scores.length}</h6>}
                {assessment.Score && <h6>Your Score: {assessment.Score}</h6>}
                {assessment.Points && <h6>Your Points: {assessment.Points}</h6>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GradesStats;
