import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Length from './components/Length'

import Temperature from './components/Temperature'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/temperature' component={Temperature}></Route>
          <Route path='/length' component={Length}></Route>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
