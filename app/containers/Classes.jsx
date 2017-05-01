import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import GradesForm from 'GradesForm';
import FontAwesome from 'react-fontawesome';
import Alert from 'Alert';

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
          if (current.class === null) {
            this.props.removeUserClass(current._id);
            return null;
          }
          return (
            <div key={current._id} className="columns medium-12">
              <div className="row class-container">
                <div className="columns small-11">
                  <Link to={`grades?id=${current.id}&url=${current.class.url}`}>
                    <div>
                        <h4>{current.class.courseName}</h4>
                        <h5>ID: {current.id}</h5>
                    </div>
                  </Link>
                </div>
                <div className="columns small-1">
                  <button onClick={() => this.props.removeUserClass(current._id)} className="delete-button">
                    <FontAwesome
                      name="trash-o"
                      size="lg"
                    />
                  </button>
                </div>
              </div>
            </div>
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

  onDelete = () => {
    if(this.props.deletedUserClass) {
      this.props.getUserClasses();
    }
  }

  renderError = () => {
    if(this.props.userClassError) {
      return (
        <div></div>
      );
    }
  }

  render() {
    this.onSuccess();
    this.onDelete();

    return (
      <div className="row user-classes">
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
    deletedUserClass: state.classes.deletedUserClass,
    userClassError: state.classes.userClassError
  };
}

export default connect(mapStateToProps, actions)(Classes);
