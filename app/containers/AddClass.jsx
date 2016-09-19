import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddClass extends Component {
  constructor(props) {
    super(props);

    this.state = { url: '' };
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const { url } = this.state;

    console.log("URL is: " + url);

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
        <div className="callout success">Added Class Successfully</div>
      );
    }
  }

  renderFailure = () => {
    if(this.props.error) {
      return (
        <div className="callout alert">{this.props.error}</div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="columns medium-5 small-centered grades-form">
          <form onSubmit={this.onFormSubmit}>
            <h3>Add a Class if it hasn't already been added</h3>
            <label>Enter Class Url</label>
            <input onChange={this.onUrlChange} type="url" value={this.state.url} />
            <button type="submit" className="button expanded">Submit</button>
            {this.renderSuccess()}
            {this.renderFailure()}
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { added: state.classes.added, error: state.classes.error };
}

export default connect(null, actions)(AddClass);
