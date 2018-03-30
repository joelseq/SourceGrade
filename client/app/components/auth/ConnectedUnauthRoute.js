import { connect } from 'react-redux';
import { UnauthRoute } from 'react-router-auth';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(UnauthRoute);
