import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import { PrecisionProvider } from './components/PrecisionControls'
import Home from './components/Home'
import Length from './components/Length'
import Weight from './components/Weight'
import Time from './components/Time'
import Area from './components/Area'

import Temperature from './components/Temperature'

class App extends Component {
  render() {
    return (
      <PrecisionProvider>
      <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/length' component={Length}></Route>
          <Route path='/weight' component={Weight}></Route>
          <Route path='/area' component={Area}></Route>
          <Route path='/time' component={Time}></Route>
          <Route path='/temperature' component={Temperature}></Route>
        </Switch>
      </div>
      </BrowserRouter>
      </PrecisionProvider>
    );
  }
}

export default App;
