import React from 'react';
import { isApproximate, unitNote } from '../conversion/units';

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
  earthOrbit: 'Astronomical Unit',
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
  earthOrbit: '（天文単位）',
  lightYear: '（光年）',
};

function LengthInput (props) {

  const lengthN = props.lengthN;
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
    } else if (event.keyCode !== 229){
      props.onAlert(230)
    }
  }

    return (
      <fieldset className="rain" title={unitNote('length', scale)}>
        <legend><span id="text"></span>{scaleNames[scale]}{scaleNames2[scale]}{isApproximate('length', scale) ? ' ≈' : ''}</legend>
        <input id="input" value={lengthN} onChange={handleChange} onKeyDown={handleKey} autoComplete="off" />
      </fieldset>
  )
}

export default LengthInput

