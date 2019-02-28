import React from 'react';

const scaleNames = {
  kilo: 'Kilo Meter（キロメートル）',
  meter: 'Meter（メートル）',
  centi: 'Centi Meter（センチメートル）',
  inch: 'inch（インチ）',
  mile: 'Mile（マイル）',
  feet: 'Feet（フィート）',
  equator: 'Equator（赤道）',
  sun: 'Sun（寸）',
  shaku: 'Shaku（尺）',
  ri: 'Ri （里）',
  light: 'Light（光年）'
};

const Length = (props) => {
  
  function handleChange(e) {
    props.onLengthChange(e.target.value);
    console.log('e.target.value:',e.target.value);
    console.log('props in handleChange:',props);
  }

    const length = props.length;
    const scale = props.scale;

    return (
      <fieldset className="rain">
        <legend>Enter value in {scaleNames[scale]}</legend>
        <input id="input" value={length} onChange={handleChange} />
      </fieldset>
  )
}

export default Length

