import React from 'react';

const scaleNames = {
  kilo: 'Kilo Meter',
  meter: 'Meter',
  centi: 'Centi Meter',
  milli: 'Milli Meter',
  inch: 'inch',
  feet: 'Feet',  
  yard:'Yard',
  mile: 'Mile',
  sun: 'Sun',
  shaku: 'Shaku',
  ken: 'Ken',
  cho: 'Cho',  
  ri: 'Ri',
  kairi: 'Kairi',  
  fuji:'Mt. Fuji',
  everest: 'Mt. Everest',
  tokyoLondon: 'Tokyo - London',
  equator: 'Equator',
  lightSec: 'Light Second',
  earthOrbit: 'Earth Orbit',
  lightYear: 'Light Year',  
};
const scaleNames2 = {
  kilo: '（キロメートル）',
  meter: '（メートル）',
  centi: '（センチメートル）',
  milli: '（ミリメートル）',
  inch: '（インチ）',
  feet: '（フィート）',  
  yard:'（ヤード）',    
  mile: '（マイル）',
  sun: '（寸）',
  shaku: '（尺）',
  ken:'（間）',  
  cho:'（町）',
  ri: '（里）',
  kairi: '（海里）',
  fuji:'（富士山）',
  everest:'（エベレスト）',
  tokyoLondon: '（東京－ロンドン間）',
  equator: '（地球の赤道）',
  lightSec: '（光秒）',
  earthOrbit: '（地球の太陽周回軌道）',
  lightYear: '（光年）',
};

function Length (props) {

  const length = props.length;
  const scale = props.scale;
  
  function handleChange(e) {
    props.onLengthChange(e.target.value, scale);
  }

  function handleKey (event){

    if (event.key === "Delete") {
      props.onClear()
    } else if (event.keyCode === 32) {
      props.onClear()
    }

    if (event.keyCode === 229){
      props.onAlert(229)
    } else if (EventTarget.keyCode !== 229){
      props.onAlert(230)
    }
  }

    return (
      <fieldset className="rain">
        <legend><span id="text">Enter value in </span>{scaleNames[scale]}{scaleNames2[scale]}</legend>
        <input id="input" value={length} onChange={handleChange} onKeyDown={handleKey}/>
      </fieldset>
  )
}

export default Length

