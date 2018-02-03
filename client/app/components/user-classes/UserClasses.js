import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { getUserClasses, addUserClass, removeUserClass } from '../../modules/user-classes';
import GradesForm from '../home/GradesForm';
import ClassCard from './ClassCard';

class UserClasses extends React.Component {
  static propTypes = {
    userClasses: PropTypes.arrayOf(PropTypes.object),
    getUserClasses: PropTypes.func,
    addUserClass: PropTypes.func,
    removeUserClass: PropTypes.func,
    addedUserClass: PropTypes.bool,
    deletedUserClass: PropTypes.bool,
    userClassError: PropTypes.string,
  }

  static defaultProps = {
    userClasses: [],
    getUserClasses() {},
    addUserClass() {},
    removeUserClass() {},
    addedUserClass: false,
    deletedUserClass: false,
    userClassError: '',
  }

  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentWillMount() {
    this.props.getUserClasses();
  }

  onSuccess() {
    if (this.props.addedUserClass) {
      this.props.getUserClasses();
    }
  }

  onDelete() {
    if (this.props.deletedUserClass) {
      this.props.getUserClasses();
    }
  }

  handleFormSubmit(id, currentClass) {
    this.props.addUserClass(id, currentClass.label);
  }

  renderClasses() {
    if (this.props.userClasses) {
      return (
        this.props.userClasses.map((current) => {
          if (current.class === null) {
            this.props.removeUserClass(current._id);
            return null;
          }
          return (
            <ClassCard key={current._id}>
              <button
                onClick={() => this.props.removeUserClass(current._id)}
                className="delete-button"
              >
                <FontAwesome
                  name="trash-o"
                  size="lg"
                />
              </button>
              <Link to={`/grades?id=${current.id}&url=${current.class.url}`}>
                <h4>{current.class.courseName}</h4>
                <h5>ID: {current.id}</h5>
              </Link>
            </ClassCard>
          );
        })
      );
    }
    return null;
  }

  renderError() {
    if (this.props.userClassError) {
      return (
        <div>{this.props.userClassError}</div>
      );
    }

    return null;
  }

  render() {
    this.onSuccess();
    this.onDelete();

    return (
      <Grid>
        <Row>
          <Col md={10}>
            <h3>My Classes</h3>
            <hr />
            <h4>Add a Class</h4>
            <GradesForm buttonText="Add" handleFormSubmit={this.handleFormSubmit.bind(this)} inline />
            {this.renderError()}
            {this.renderClasses()}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userClasses: state.user.classes,
  addedUserClass: state.user.addedUserClass,
  deletedUserClass: state.user.deletedUserClass,
  userClassError: state.user.userClassError,
});

const actions = {
  getUserClasses,
  addUserClass,
  removeUserClass,
};

export default connect(mapStateToProps, actions)(UserClasses);
