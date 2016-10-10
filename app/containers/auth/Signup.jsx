import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.userSignup(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="callout alert">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { username, password, passwordConfirm }} = this.props;

    return (
      <div>
        <h3 className="auth-header-text">Create an account</h3>
        <h5 className="warning-text">Do Not Use Your UCSD username and password!</h5>
        <div className="row">
          <div className="columns medium-4 small-centered">
            <form className="auth-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
              <fieldset>
                <input {...username} type="text" name="username" placeholder="Username" />
                {username.touched && username.error && <div className="callout alert">{username.error}</div>}
              </fieldset>
              <fieldset>
                <input {...password} type="password" name="password" placeholder="Password" />
                {password.touched && password.error && <div className="callout alert">{password.error}</div>}
              </fieldset>
              <fieldset>
                <input {...passwordConfirm} type="password" name="confirmation" placeholder="Confirm Password" />
                {passwordConfirm.touched && passwordConfirm.error && <div className="callout alert">{passwordConfirm.error}</div>}
              </fieldset>
              <button className="button expanded">Sign Up</button>
              {this.renderAlert()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if(!formProps.username) {
    errors.username = 'Please enter a Username';
  }
  if(!formProps.password) {
    errors.password = 'Please enter a Password';
  }
  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a Password Confirmation';
  }
  if(formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
