import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleFormSubmit({ username, password }) {
    this.props.userLogin({ username, password });
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
    const { handleSubmit, fields: { username, password }} = this.props;

    return (
      <div>
        <h3 className="auth-header-text">Login to your account</h3>
        <div className="row">
          <div className="columns medium-4 small-centered">
            <form className="auth-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
              <input {...username} type="text" name="username" placeholder="Username" />
              {username.touched && username.error && <div className="callout alert">{username.error}</div>}
              <input {...password} type="password" name="password" placeholder="Password" />
              {password.touched && password.error && <div className="callout alert">{password.error}</div>}
              <button className="button expanded">Login</button>
              {this.renderAlert()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password']
}, mapStateToProps, actions)(Login);
