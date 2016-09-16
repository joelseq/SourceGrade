import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FontAwesome from 'react-fontawesome';

class Logout extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.userSignout();
  }

  componentDidMount() {
    this.context.router.push('/');
  }

  render() {
    return (
      <div className="spinner-container">
        <FontAwesome
          className='loading-spinner'
          name='circle-o-notch'
          size='3x'
          spin
        />
      </div>
    );
  }
}

export default connect(null, actions)(Logout);
