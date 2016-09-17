import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Classes extends Component {
  componentWillMount() {
    this.props.getUserClasses();
  }

  renderClasses() {
    return (
      this.props.classes.map(current => {
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

  render() {
    if(!this.props.classes) {
      return (
        <div className="row">
          <div className="columns medium-6 small-centered">
            <h3>Add a class</h3>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="columns medium-9 small-centered">
          <h3>My Classes</h3>
          <hr />
          {this.renderClasses()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { classes: state.classes.userClasses };
}

export default connect(mapStateToProps, actions)(Classes);
