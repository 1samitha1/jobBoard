import React, { Component } from 'react'
import './App.css'
import Home from './components/Home/home'
import Register from './components/RegSelector/regSelector';
import RegProvider from './components/Register/regProvider';
import NotFound from './components/Errors/notFound';
import Login from './components/Login/login';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
// import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:5000/'

class App extends Component {

  render () {
    return (
      
          <div className="app">
          <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/provider_registration" component={RegProvider} />
                
                <Route component={NotFound} />

              </Switch>
            </BrowserRouter>
          </div>
     
    )
  }
}

export default App
