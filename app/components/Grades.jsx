const React = require('react');
const getData = require('getData');
const GradesForm = require('GradesForm');
const GradesResult = require('GradesResult');

const Grades = React.createClass({
  getInitialState: () => {
    grades: []
  },
  handleSearch: (id, url) => {
    getData.fetch(id, url).then(function(grades) {
      self.setState({
        grades: grades
      });
    }, function(errorMessage) {
      alert(errorMessage);
    });
  },
  render: () => {
    let {grades} = this.state;

    function renderGrades() {
      if(grades.length > 0) {
        return <GradesResult grades={grades} />;
      } else {
        return <GradesForm onSearch={this.handleSearch} />
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