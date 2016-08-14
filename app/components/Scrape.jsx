var React = require('react');
var getData = require('getData');
var Grades = require('Grades');

var Scrape = React.createClass({
  getInitialState: function() {
    return {
      grades: []
    }
  },
  onFormSubmit: function(e) {
    var self = this;
    e.preventDefault();

    let id = this.refs.id.value;
    let url = this.refs.url.value;

    getData.fetch(id, url).then(function(grades) {
      self.setState({
        grades: grades
      });
    }, function(errorMessage) {
      alert(errorMessage);
    })
  },
  render: function() {
    var {grades} = this.state;

    function renderGrades() {
      if(grades.length > 0) {
        return <Grades grades={grades}/>;
      }
    }

    return (
      <div className="row">
        <div className="columns medium-6 small-centered">
          <form onSubmit={this.onFormSubmit}>
            <input type="text" ref="id" placeholder="Secret Number"/>
            <input type="text" ref="url" placeholder="Course URL"/>
            <button className="button expanded hollow">Get Grades</button>
          </form>
        </div>
        <div>
          {renderGrades()}
        </div>
      </div>
    );
  }
});

module.exports = Scrape;