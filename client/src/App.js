import React, { Component } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './store'
import Auth from './components/Auth/auth'

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="app">
          <Auth />
        </div>
      </Provider>
    )
  }
}

export default App
