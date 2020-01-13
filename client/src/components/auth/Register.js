import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


import { setAlert } from '../../actions/alert';

const Register = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const { username, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if( password !== password2) {
            props.setAlert('passwords do not match', 'danger')
        } else {
            console.log('success');
        }
    }
    
    return ( 
    <Fragment>
    <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Username" 
          name="username"
          value={username} 
          onChange={e => onChange(e)}
          required />
        </div>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          name="email" 
          onChange={e => onChange(e)}
          value={email}    
          />
          <small className="form-text"
            >Gravatar Enabled
            </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => onChange(e)}
            value={password}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={e => onChange(e)}
            value={password2}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
      </Fragment>
)}
export default connect(null, { setAlert })(Register);