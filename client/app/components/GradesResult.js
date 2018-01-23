import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Grid,
} from 'react-bootstrap';
import queryString from 'query-string';

import { fetchGrades, removeGrades } from '../actions';
import Spinner from './Spinner';
import GradesTable from './GradesTable';
import GradesStats from './GradesStats';

class GradesResult extends React.Component {
  static propTypes = {
    grades: PropTypes.object,
    /**
     * Location object passed in from react-router
     * @type {object}
     */
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    /**
     * Action creator to fetch user's grades
     * @type {function}
     */
    fetchGrades: PropTypes.func,
    /**
     * Action creator to clear grades from Redux store
     * @type {function}
     */
    removeGrades: PropTypes.func,
    /**
     * Error string from Redux store
     * @type {[type]}
     */
    error: PropTypes.string,
  }

  static defaultProps = {
    grades: {},
    location: {
      search: '',
    },
    fetchGrades() {},
    removeGrades() {},
    error: '',
  }

  static filterScore(score) {
    const scores = score.split('%');
    if (scores.length > 1) {
      return `${scores[0]}%`;
    }
    return scores[0];
  }

  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);

    if (query.id && query.url) {
      this.props.fetchGrades(query);

      // Fire GA event for analytics
      const eventString = `${query.id} - ${query.url}`;
      /* eslint-disable no-undef */
      ga('send', 'event', 'GradesResult', 'lookup', eventString);
      /* eslint-enable no-undef */
    }
  }

  componentWillUnmount() {
    this.props.removeGrades();
  }

  render() {
    const { grades, selectedClass, error } = this.props;

    if (error) {
      return (
        <div>
          <h4><strong>Oops!</strong> {error}</h4>
          <h5>
            Please make sure that the ID is valid and the URL is the course
            homepage (it should end with index.html)
          </h5>
        </div>
      );
    }

    if (!grades.courseName) {
      return <Spinner />;
    }

    return (
      <Grid>
        <Row>
          <Col md={12}>
            <h2>{grades.courseName}</h2>
            <h3>{grades.instructor}</h3>
          </Col>
          <Col md={12}>
            <h3>Statistics</h3>
            <hr />
            <GradesStats assessment={selectedClass} />
          </Col>
          <Col md={6}>
            <h3>Categories</h3>
            <hr />
            <GradesTable grades={grades.csGrades} />
          </Col>
          <Col md={6}>
            <h3>Assessments</h3>
            <hr />
            <GradesTable grades={grades.asGrades} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    grades: state.grades.data,
    selectedClass: state.grades.selectedClass,
    error: state.grades.error,
  };
}

const actions = {
  fetchGrades,
  removeGrades,
};

export default connect(mapStateToProps, actions)(GradesResult);
