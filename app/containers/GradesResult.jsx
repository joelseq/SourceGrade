import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FontAwesome from 'react-fontawesome';
import GradesStats from 'GradesStats';
import Spinner from 'Spinner';

const propTypes = {
  grades: PropTypes.object
};

const defaultProps = {
  grades: {}
};

class GradesResult extends Component {
  constructor(props) {
    super(props);
    this.renderCategories = this.renderCategories.bind(this);
    this.renderGrades = this.renderGrades.bind(this);
  }

  componentWillMount() {
    const query = this.props.location.query;
    if(query) {
      this.props.fetchGrades(query);
    }
  }

  componentWillUnmount() {
    this.props.removeGrades();
  }

  renderGrades(assessment) {
    function filterScore(score) {
      const scores = score.split('%');
      if(scores.length > 1) {
        return `${scores[0]}%`;
      }
      return scores[0];
    }

    return (
      <tr key={assessment.name}>
        <td onClick={() => this.props.selectClass(assessment) }>{assessment.name}</td>
        <td>{assessment.Rank && `${assessment.Rank} / ${assessment.scores.length}`}</td>
        <td>{filterScore(assessment.Score)}</td>
        <td>{assessment.Points}</td>
      </tr>
    );
  }

  render() {
    const { grades, selectedClass, error } = this.props;

    if(error) {
      return (
        <div className="error-message">
          <div className="callout alert">
            <h4><strong>Oops!</strong> {error}</h4>
            <h5>
              Please make sure that the ID is valid and the URL is the course
              homepage (it should end with index.html)
            </h5>
          </div>
        </div>
      );
    }

    if(!grades.courseName) {
      return <Spinner />;
    }

    return (
      <div className="row">
        <div className="columns medium-12">
          <h2>{grades.courseName}</h2>
          <h3>{grades.instructor}</h3>
        </div>
        <div className="columns medium-12">
          <h3>Statistics</h3>
          <hr />
          <GradesStats assessment={selectedClass} />
        </div>
        <div className="columns medium-6">
          <h3>Categories</h3>
          <hr />
          <table className="assessments-table stack">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rank</th>
                <th>Score</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {grades.csGrades.map(this.renderGrades)}
            </tbody>
          </table>
        </div>
        <div className="columns medium-6">
          <h3>Asessments</h3>
          <hr />
          <table className="assessments-table stack">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rank</th>
                <th>Score</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {grades.asGrades.map(this.renderGrades)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    grades: state.grades.data,
    selectedClass: state.grades.selectedClass,
    error: state.grades.error
  };
}

export default connect(mapStateToProps, actions)(GradesResult);

GradesResult.propTypes = propTypes;
GradesResult.defaultProps = defaultProps;
