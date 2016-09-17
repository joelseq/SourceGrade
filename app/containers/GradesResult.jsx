import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Chart } from 'react-google-charts';
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

  renderCategories() {
    const { csGrades } = this.props.grades;
    const names = csGrades.map(grade => grade.name);
    const values = csGrades.map(grade => {
      const num = parseFloat(grade.Score.split("%")[0]);
      return num;
    });
    const data = [['Category', 'Score']];

    for(let i = 0; i < names.length; i++) {
      const name = names[i];
      const value = values[i];
      data.push([name, value]);
    }

    const options = {
      title: 'Category Scores'
    }

    return (
      <div className="chart-container">
        <Chart
          chartType="ColumnChart"
          data={data}
          options={options}
          graph_id="ColumnChart"
          width={"100%"}
          height={"400px"}
          legend_toggle={true}
        />
      </div>
    );
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
          <hr />
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
