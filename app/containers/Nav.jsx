import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';

class Nav extends React.Component {
  renderLinks() {
    if(this.props.authenticated) {
      return (
        <li>
          <Link to="logout" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Logout</Link>
        </li>
      );
    } else {
      return [
        <li>
          <Link to="login" activeClassName="active" activeStyle={{fontWeight: 'bold'}} key={1}>Login</Link>
        </li>,
        <li>
          <Link to="signup" activeClassName="active" activeStyle={{fontWeight: 'bold'}} key={2}>Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <div className="nav-container">
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li>
                <IndexLink to="/" className="brand-text">SourceGrade</IndexLink>
              </li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              {this.renderLinks()}
            </ul>
          </div>
        </div>
        <div className="gold-line" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Nav);
