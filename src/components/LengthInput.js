import React from 'react';

const scaleNames = {
  kilo: 'Kilo Meter',
  meter: 'Meter',
  centi: 'Centi Meter',
  inch: 'inch',
  mile: 'Mile',
  feet: 'Feet',
  equator: 'Equator',
  sun: 'Sun',
  shaku: 'Shaku',
  ri: 'Ri',
  light: 'Light Year',
  lightSec: 'Light Second',
  yard:'Yard',
  earthOrbit: 'Earth Orbit'
};
const scaleNames2 = {
  kilo: '（キロメートル）',
  meter: '（メートル）',
  centi: '（センチメートル）',
  inch: '（インチ）',
  mile: '（マイル）',
  feet: '（フィート）',
  equator: '（地球の赤道）',
  sun: '（寸）',
  shaku: '（尺）',
  ri: '（里）',
  light: '（光年）',
  lightSec: '（光秒）',
  yard:'（ヤード）',
  earthOrbit: '（地球の太陽周回軌道）'
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
    if (event.key === "Delete") {
      props.onClear()
    }
    if (event.keyCode === 229){
      props.onAlert(229)
    }
    else if (EventTarget.keyCode !== 229){
      props.onAlert(230)
    }
  }

    const length = props.length;
    const scale = props.scale;
    return (
      <fieldset className="rain">
        <legend><span id="text">Enter value in </span>{scaleNames[scale]}{scaleNames2[scale]}</legend>
        <input id="input" value={length} onChange={handleChange} onKeyDown={handleKey}/>
      </fieldset>
  )
}

export default Length

