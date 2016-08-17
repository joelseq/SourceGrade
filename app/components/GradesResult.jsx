const React = require('react');
const rd3 = require('react-d3');
const LineChart = rd3.LineChart

const GradesResult = React.createClass({
  render: function() {
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
});

module.exports = GradesResult;