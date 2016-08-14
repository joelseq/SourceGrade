var React = require('react');

var Grades = (props) => {
  var grades = props.grades;

  return (
    <div>{grades[0].name}</div>
  );

};

module.exports = Grades;