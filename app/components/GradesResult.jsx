import React, { PropTypes } from 'react';
import rd3, { LineChart } from 'react-d3';

const propTypes = {
  grades: PropTypes.array
};

const defaultProps = {
  grades: []
};

export default class GradesResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {grades} = this.props;

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

GradesResult.propTypes = propTypes;
GradesResult.defaultProps = defaultProps;