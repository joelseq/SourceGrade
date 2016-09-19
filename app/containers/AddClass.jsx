import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Alert from 'Alert';

class AddClass extends Component {
  constructor(props) {
    super(props);

    this.state = { url: '' };
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const { url } = this.state;

    if(url.length > 0) {
      this.props.addClass(url);
    }
  }

  onUrlChange = (e) => {
    this.setState({ url: e.target.value });
  }

  renderSuccess = () => {
    if(this.props.added) {
      return (
        <Alert className={'success'} message={'Added Class Successfully'} onClose={this.props.removeAlert} />
      );
    }
  }

  renderFailure = () => {
    if(this.props.error) {
      return (
        <Alert className={'alert'} message={this.props.error} onClose={this.props.removeAlert} />
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="columns medium-5 small-centered">
          <form className="grades-form" onSubmit={this.onFormSubmit}>
            <h3>Add a Class if it hasn't already been added</h3>
            <label>Enter Class Url</label>
            <input onChange={this.onUrlChange} type="url" value={this.state.url} />
            <button type="submit" className="button expanded">Submit</button>
          </form>
          {this.renderSuccess()}
          {this.renderFailure()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { added: state.classes.added, error: state.classes.error };
}

export default connect(mapStateToProps, actions)(AddClass);
