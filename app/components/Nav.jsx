import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li>
                <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink>
              </li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <Link to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</Link>
              </li>
              <li>
                <Link to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
        <div id="gold-line" />
      </div>
    );
  }
}
