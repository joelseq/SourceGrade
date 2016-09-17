import React, { Component, PropTypes } from 'react';
import GradesForm from 'GradesForm';

export default class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleFormSubmit(id, url) {
    this.context.router.push(`/grades?id=${id}&url=${url}`);
  }

  render() {
    return (
      <div id="grades-form" className="row">
        <div className="columns medium-6 small-centered">
          <h1 className="text-center">Welcome to SourceGrade</h1>
          <h3 className="text-center">Search for your grades</h3>
          <GradesForm
            handleFormSubmit={this.handleFormSubmit.bind(this)}
            buttonText={'Get Grades'}
            buttonClass={'button expanded'}
          />
        </div>
      </div>
    );
  }
}
