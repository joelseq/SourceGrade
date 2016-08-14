var React = require('react');

var Scrape = React.createClass({
  onFormSubmit: (e) => {
    e.preventDefault();

    alert('This will fetch your grades soon!');
  },
  render: function() {
    return (
      <div className="row">
        <div className="columns medium-6 small-centered">
          <form onSubmit={this.onFormSubmit}>
            <input type="text" ref="id" placeholder="Secret Number"/>
            <input type="text" ref="url" placeholder="Course URL"/>
            <button className="button expanded hollow">Get Grades</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Scrape;