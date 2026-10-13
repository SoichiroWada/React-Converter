import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/length' element={<Length />} />
          <Route path='/weight' element={<Weight />} />
          <Route path='/area' element={<Area />} />
          <Route path='/time' element={<Time />} />
          <Route path='/temperature' element={<Temperature />} />
        </Routes>
      </div>
      </BrowserRouter>
      </PrecisionProvider>
    );
  }
}

export default App;
