import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';


//redux stuff
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth'; 
import store from './store';
import setAuthToken from './tools/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return(
  <Provider store={store}>
    <Router>  
      <Fragment>
        <Navbar />
        <Route exact path='/' component={ Landing } />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path='/login' component={ Login } />
            <Route exact path='/register' component={ Register } />
            <PrivateRoute exact path='/dashboard' component={ Dashboard } />
          </Switch>
        </section>
      </Fragment>
    </Router> 
  </Provider> 
)};
  
export default App;
