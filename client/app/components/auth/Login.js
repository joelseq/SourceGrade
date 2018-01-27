import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  Grid,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';

import { userLogin } from '../../modules/auth';
import { history } from '../../store';

import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';

class Login extends React.Component {
  static propTypes = {
    /**
     * Prop passed from Redux Form to help with form submit
     * @type {function}
     */
    handleSubmit: PropTypes.func,
    /**
     * Redux Form string for form submission related errors
     * @type {string}
     */
    error: PropTypes.string,
    /**
     * Whether form is in invalid (has validation errors)
     * @type {boolean}
     */
    invalid: PropTypes.bool,
    /**
     * Whether form is submitting
     * @type {boolean}
     */
    submitting: PropTypes.bool,
  }

  static defaultProps = {
    handleSubmit() {},
    error: null,
    invalid: true,
    submitting: false,
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      history.replace('/');
    }
  }

  render() {
    const {
      handleSubmit,
      error,
      submitting,
      invalid,
    } = this.props;
    const disableButton = submitting || invalid;

    return (
      <Grid>
        <Row>
          <Col lg={6} lgOffset={3} md={8} mdOffset={2}>
            <h2>Login to an existing account</h2>
            <form onSubmit={handleSubmit}>
              <Field name="username" component={UsernameInput} />
              <Field name="password" component={PasswordInput} />
              <Button disabled={disableButton} type="submit">Submit</Button>
              {error && <Alert bsStyle="danger" style={{ marginTop: '20px' }}>{error}</Alert>}
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const validate = ({ username, password }) => {
  const errors = {};
  if (!username) {
    errors.username = 'Username cannot be empty';
  }
  if (!password) {
    errors.password = 'Password cannot be empty';
  }
  return errors;
};

export default reduxForm({
  form: 'login',
  validate,
  onSubmit: (values, dispatch) => {
    return dispatch(userLogin(values));
  },
})(Login);
