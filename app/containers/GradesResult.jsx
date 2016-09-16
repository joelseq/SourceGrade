import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGrades } from '../actions';
import { Chart } from 'react-google-charts';
import FontAwesome from 'react-fontawesome';

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
  }

  componentWillMount() {
    const query = this.props.location.query;
    if(query) {
      this.props.fetchGrades(query);
    }
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

  renderStats(assessment) {
    if(!assessment) {
      return (
        <div className="chart-container">
          <h5 className="pre-stats-text">Click "View Statistics" on an assessment or category to begin.</h5>
        </div>
      );
    }
  }

  renderGrades(assessment) {
    return (
      <tr key={assessment.name}>
        <td>{assessment.name}</td>
        <td>{(assessment.Rank) ? `${assessment.Rank} / ${assessment.scores.length}` : ""}</td>
        <td>{assessment.Score}</td>
        <td>{assessment.Points}</td>
        <td><a href="#">View Statistics</a></td>
      </tr>
    );
  }

  render() {
    const { grades } = this.props;

    if(!grades.courseName) {
      return (
        <div className="spinner-container">
          <FontAwesome
            className='loading-spinner'
            name='circle-o-notch'
            size='3x'
            spin
          />
        </div>
      );
    }

    return (
      <div className="row">
        <div className="columns medium-12">
          <h2>{grades.courseName}</h2>
          <h3>{grades.instructor}</h3>
          <hr />
        </div>
        <div className="columns medium-6">
          <h3>Categories</h3>
          <hr />
          <table className="assessments-table stack">
            <thead>
              <tr>
                <th>Assessment name</th>
                <th>Rank</th>
                <th>Score</th>
                <th>Points</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {grades.csGrades.map(this.renderGrades)}
            </tbody>
          </table>
          <h3>Asessments</h3>
          <hr />
          <table className="assessments-table stack">
            <thead>
              <tr>
                <th>Assessment name</th>
                <th>Rank</th>
                <th>Score</th>
                <th>Points</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {grades.asGrades.map(this.renderGrades)}
            </tbody>
          </table>
        </div>
        <div className="columns medium-6">
          <h3>Statistics</h3>
          <hr />
          {this.renderStats()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { grades: state.grades };
}

export default connect(mapStateToProps, { fetchGrades })(GradesResult);

GradesResult.propTypes = propTypes;
GradesResult.defaultProps = defaultProps;
