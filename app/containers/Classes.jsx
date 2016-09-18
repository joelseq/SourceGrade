import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import GradesForm from 'GradesForm';

class Classes extends Component {
  componentWillMount() {
    this.props.getUserClasses();
  }

  handleFormSubmit(id, currentClass) {
    this.props.addUserClass(id, currentClass.label);
  }

  renderClasses = () => {
    if(this.props.userClasses) {
      return (
        this.props.userClasses.map(current => {
          return (
            <Link key={current._id} to={`grades?id=${current.id}&url=${current.class.url}`}>
              <div className="class-container">
                  <h4>{current.class.courseName}</h4>
                  <h5>ID: {current.id}</h5>
              </div>
            </Link>
          );
        })
      );
    }
  }

  onSuccess = () => {
    if(this.props.addedUserClass) {
      this.props.getUserClasses();
    }
  }

  renderError = () => {
    if(this.props.userClassError) {
      return (
        <div className="callout alert" data-closable>
          <strong>Oops!</strong> {this.props.userClassError}
            <button className="close-button" aria-label="Dismiss alert" type="button" data-close>
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
      );
    }
  }

  render() {
    this.onSuccess();

    return (
      <div className="row">
        <div className="columns medium-10 small-centered">
          <h3>My Classes</h3>
          <hr />
          <h4>Add a Class</h4>
          <div className="inline-form">
            <GradesForm buttonText={'Add'} handleFormSubmit={this.handleFormSubmit.bind(this)} />
          </div>
          {this.renderError()}
          {this.renderClasses()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userClasses: state.classes.userClasses,
    addedUserClass: state.classes.addedUserClass,
    userClassError: state.classes.userClassError
  };
}

export default connect(mapStateToProps, actions)(Classes);
