import React, { Component, PropTypes } from 'react';
import GradesForm from 'GradesForm';
import { Link } from 'react-router';

export default class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleFormSubmit(id, currentClass) {
    this.context.router.push(`/grades?id=${id}&url=${currentClass.value}`);
  }

  render() {
    return (
      <div class="grades-form" className="row">
        <div className="columns medium-6 small-centered">
          <h1 className="text-center">Welcome to SourceGrade!</h1>
          <h3 className="text-center">Search for your grades</h3>
          <GradesForm
            handleFormSubmit={this.handleFormSubmit.bind(this)}
            buttonText={'Get Grades'}
            buttonClass={'button expanded'}
          />
          <p>
            Can't find your class? Click <Link to="add">here</Link> to add it
          </p>
          <p className="bottom-info-text">
            Sign up with SourceGrade to save your classes to your account and
            keep your secret numbers recorded. This way you'll never have to
            remember your course url or secret number again!
          </p>
        </div>
      </div>
    );
  }
}
