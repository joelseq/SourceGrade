const React = require('react');
const getData = require('getData');
const GradesForm = require('GradesForm');
const GradesResult = require('GradesResult');

const Grades = React.createClass({
  getInitialState: function() {
    return {
      grades: []
    }
  },
  handleSearch: function(id, url) {
    let self = this;

    getData.fetch(id, url).then(function(grades) {
      self.setState({
        grades: grades
      });
    }, function(errorMessage) {
      alert(errorMessage);
    });
  },
  render: function() {
    let self = this;
    let {grades} = self.state;

    function renderGrades() {
      if(grades.length > 0) {
        return <GradesResult grades={grades} />;
      } else {
        return <GradesForm onSearch={self.handleSearch} />
      }
    }

    return (
      <div>
        <h1 className="text-center">Get Grades</h1>
        {renderGrades()}
      </div>
    );
  }
})

module.exports = Grades;