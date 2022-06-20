import React from 'react'

const Home = (props) => {
  const belowNavbarHeight = window.screen.height - 64;
  return (
    <div className='box' style={{height: belowNavbarHeight}}>
      <div>
        <h4>Converter Home</h4>
      </div>
    </div>
  )
}

export default Home
