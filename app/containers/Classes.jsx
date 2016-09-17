import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import GradesForm from 'GradesForm';

class Classes extends Component {
  componentWillMount() {
    this.props.getUserClasses();
  }

  handleFormSubmit() {

  }

  renderClasses() {
    if(this.props.userClasses) {
      return (
        this.props.userClasses.map(current => {
          return (
            <Link key={current._id} to={`grades?id=${current.id}&url=${current.course.url}`}>
              <div className="class-container">
                  <h3>{current.course.courseName}</h3>
              </div>
            </Link>
          );
        })
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="columns medium-10 small-centered">
          <h3>My Classes</h3>
          <hr />
          <h4>Add a Class</h4>
          <div className="inline-form">
            <GradesForm buttonText={'Add'} />
          </div>
          {this.renderClasses()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userClasses: state.classes.userClasses };
}

export default connect(mapStateToProps, actions)(Classes);
