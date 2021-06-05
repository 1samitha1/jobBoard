import React, { Component } from 'react'
import './App.css'
import {getToken, extractToken} from '../src/helpers/jwtHandler';
import Home from './components/Home/home'
import Register from './components/RegSelector/regSelector';
import RegProvider from './components/Register/regProvider';
import RegSeeker from './components/Register/regSeeker';
import NotFound from './components/Errors/notFound';
import Login from './components/Login/login';
import IndexPage from './components/IndexPage/indexPage';
import CreateJobs from './components/Job/createJobPosts';
import ApplyJob from './components/Job/applyJob';
import AdminLogin from './components/Admin/adminLogin';
import AdminDashbord from './components/Admin/dashboard';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

// Error pages
import OnlyForProviders from './components/Errors/onlyForProviders'

const authUser = JSON.parse(localStorage.getItem("authenticatedUser"))
const token = getToken();
let admin = undefined;
if(token){
  admin = extractToken(token)
}
class App extends Component {

  render () {
    return (
      
          <div className="app">
          <BrowserRouter>
              <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/home" component={authUser ? Home : Login} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/provider_registration" component={RegProvider} />
                <Route path="/seeker_registration" component={RegSeeker} />
                <Route path="/apply_job" component={ApplyJob} />

                <Route path="/admin-login" component={AdminLogin} />
                <Route path="/admin-dashboard" component={admin ? AdminDashbord : AdminLogin } />

                {(authUser && authUser.userType === 'provider') ?
                 <Route path="/create_a_job_post" component={CreateJobs} />
                 :
                 <Route path="/create_a_job_post" component={OnlyForProviders} />
                }
                
                <Route component={NotFound} />

              </Switch>
            </BrowserRouter>
          </div>
     
    )
  }
}

export default App
