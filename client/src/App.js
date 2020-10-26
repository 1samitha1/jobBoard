import React, { Component } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './store'
import Auth from './components/Auth/auth'
import Home from './components/Home/home'
import Register from './components/RegSelector/regSelector';
import RegProvider from './components/Register/regProvider';
import NotFound from './components/Errors/notFound'
import {Route, Switch} from 'react-router-dom';
import {home} from './routes/pageRoutes';

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Auth} />
            <Route path="/register" component={Register} />
            <Route path="/provider_registration" component={RegProvider} />
            
            <Route component={NotFound} />
          </Switch>
         
        </div>
      </Provider>
    )
  }
}

export default App
