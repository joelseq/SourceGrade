import React, { Component, PropTypes } from 'react';
import rd3, { LineChart } from 'react-d3';
import { connect } from 'react-redux';
import { fetchGrades } from '../actions';

const propTypes = {
  grades: PropTypes.array
};

const defaultProps = {
  grades: []
};

class GradesResult extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const query = this.props.location.query;
    if(query) {
      this.props.fetchGrades(query);
    }
  }

  render() {
    var {grades} = this.props;

    if(!grades) {
      return <h3>Loading...</h3>;
    }

    var width = 700;
    var height = 300;
    var chartData = [];

    function renderGrades() {
      let chartIndex = 0;
      return (
        grades.map((grade) => {
          chartData.push([{
            name: 'Grades',
            values: []
          }]);

          for(var i = 0; i < grade.scores.length; i++) {
            chartData[chartIndex][0].values.push({
              x: i,
              y: grade.scores[i]
            });
          }
          chartIndex++;
          return <LineChart data={chartData[chartIndex-1]} width={width} height={height} title={grade.name} />;
        })
      );
    }

    return (
      <div className="row">
        <div className="columns medium-6 small-centered">
          {renderGrades()}
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