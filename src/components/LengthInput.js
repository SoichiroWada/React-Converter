import React from 'react';

const scaleNames = {
  kilo: 'Kilo Meter（キロメートル）',
  meter: 'Meter（メートル）',
  centi: 'Centi Meter（センチメートル）',
  inch: 'inch（インチ）',
  mile: 'Mile（マイル）',
  feet: 'Feet（フィート）',
  equator: 'Equator（地球の赤道）',
  sun: 'Sun（寸）',
  shaku: 'Shaku（尺）',
  ri: 'Ri（里）',
  light: 'Light Year（光年）',
  lightSec: 'Light Second（光秒）',
  yard:'Yard（ヤード）',
  earthOrbit: 'Earth Orbit（地球の太陽周回軌道）'
};

const Length = (props) => {
  
  function handleChange(e) {
    props.onLengthChange(e.target.value);
    // console.log('e.target.value:',e.target);
    // console.log('props in handleChange:',props);
  }

  function handleKey (event){
    // console.log('event.key:', event.key)
    // console.log('event.keyCode:',event.keyCode)
    if (event.key === "Control") {
      props.onClear()
    }
  }

    const length = props.length;
    const scale = props.scale;
    return (
      <fieldset className="rain">
        <legend>Enter value in {scaleNames[scale]}</legend>
        <input id="input" value={length} onChange={handleChange} onKeyDown={handleKey}/>
      </fieldset>
  )
}

export default Length

