import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGrades } from '../actions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Chart } from 'react-google-charts';

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
    const {csGrades} = this.props.grades;
    const names = csGrades.map(grade => grade.name);
    const values = csGrades.map(grade => {
      const num = parseFloat(grade.Score.split("%")[0]);
      return num;
    });
    const data = [];

    for(let i = 0; i < names.length; i++) {
      const name = names[i];
      const value = values[i];
      data.push({ name, value });
    }

    return (
      <BarChart width={800} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip/>
        <Bar dataKey="value" fill="#0f0060" />
      </BarChart>
    );
  }

  renderGrades() {
    const {asGrades} = this.props.grades;

    return (
      asGrades.map(grade => {
        const options = { title: grade.name };
        const data = [grade.scores];
        return (
          <Chart
            chartType="Histogram"
            data={data}
            options={options}
            key={grade.name}
            width={"80%"}
            height={"400px"}
          />
        );
      })
    );
  }

  render() {
    var {grades} = this.props;

    if(!grades.courseName) {
      return <h3>Loading...</h3>;
    }

    return (
      <div className="row">
        <div className="columns medium-9 small-centered">
          <h2>{grades.courseName}</h2>
          <h3>{grades.instructor}</h3>
          {this.renderCategories()}
          {this.renderGrades()}
          <a className="bottom-links" href="#">View All Scores</a>
          <a className="bottom-links" href="#">View Statistics</a>
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
