import React from 'react';
import getData from 'getData';
import GradesForm from 'GradesForm';
import GradesResult from 'GradesResult';

export default class Grades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }

  handleSearch = (id, url) => {
    const self = this;

    getData.fetch(id, url).then(function(grades) {
      self.setState({
        grades: grades
      });
    }, function(errorMessage) {
      alert(errorMessage);
    });
  };

  render() {
    const self = this;
    const {grades} = self.state;

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
}