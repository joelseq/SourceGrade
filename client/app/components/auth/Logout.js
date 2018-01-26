import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { history } from '../../store';
import { userSignout } from '../../modules/auth';
import Spinner from '../Spinner';

class Logout extends React.Component {
  static propTypes = {
    /**
     * Action creator to log out user
     * @type {function}
     */
    userSignout: PropTypes.func,
  }

  static defaultProps = {
    userSignout() {},
  }

  componentWillMount() {
    this.props.userSignout();
  }

  componentDidMount() {
    history.push('/');
  }

  render() {
    return <Spinner />;
  }
}

export default connect(null, { userSignout })(Logout);
