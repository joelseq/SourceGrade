import React, { Component } from 'react';

class GradesStats extends Component {
  render() {
    const { assessment } = this.props;

    if(!assessment) {
      return (
        <div className="chart-container">
          <h5 className="pre-stats-text">Click on an Assessment or Category to begin.</h5>
        </div>
      );
    } else {
      return (
        <div className="chart-container">
          <h5 className="pre-stats-text">{assessment.name} has been selected!</h5>
        </div>
      );
    }
  }
}

export default GradesStats;
