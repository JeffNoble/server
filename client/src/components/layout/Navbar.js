import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { logout } from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {
  const authLinks = (
    <ul>
        <li>
          <a onClick={logout} href='#!'>Logout</a>
        </li>
    </ul>
  );

  const guestLinks = (
    <ul>
        <li>
          <Link to="/profiles">Icons</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
  );


    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          <i className="fas fa-code" /> Clean Your Room
        </Link>
      </h1> 
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> )}
      
    </nav>
    );//^ if not loading do this, create fragment check Auth and load links.turinary function
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);
