import React, { Component } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import { PrecisionProvider } from './components/PrecisionControls'
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
          <Route path='/' element={<Length />} />
          {/* Length moved to the top page; keep old /length links working. */}
          <Route path='/length' element={<Navigate to='/' replace />} />
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
