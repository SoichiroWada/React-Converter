import React from 'react';

const scaleNames = {
    squareKiloMeter:'Square Kilo Meter',
    squareMeter:'Square Meter',
    squareCentiMeter:'Square Centi Meter',
    squareMilliMeter:'Square Milli Meter',
    are:'Are',
    hectare:'Hectare',
    squareInch:'Square Inch',
    squareFeet:'Square Feet',
    squareYard:'Square Yard',
    squarePerch:'Square Perch',
    squareMile:'Square Mile',
    acre:'Acre',
    cho:'Cho',
    tan:'Tan',
    se:'Se',
    tsubo:'Tsubo',
    gou:'Gou',
    shaku:'Shaku',
    Australia:'Australia',
    Canada:'Canada',
    Japan:'Japan',
    USA:'USA',
    China:'China',    
    LandOnEarth:'Land on Earth',
}

const scaleNames2 = {
    squareKiloMeter:'（平方キロメートル）',
    squareMeter:'（平方メートル）',
    squareCentiMeter:'（平方センチメートル）',
    squareMilliMeter:'（平方ミリメートル）',
    are:'（アール）',
    hectare:'（ヘクタール）',
    squareInch:'（平方インチ）',
    squareFeet:'（平方フィート）',
    squareYard:'（平方ヤード）',
    squarePerch:'（平方パーチ）',
    squareMile:'（平方マイル）',
    acre:'(エーカー)',
    cho:'（町）',
    tan:'（半）',
    se:'（畝）',
    tsubo:'（坪）',
    gou:'（合）',
    shaku:'（勺）',
    Australia:'（オーストラリア）',
    Canada:'（カナダ）',
    Japan:'（日本）',
    USA:'（アメリカ合衆国）',
    China:'（中国）',
    LandOnEarth:'（地球の陸地）',
}

function AreaInput (props) {

    const areaN = props.areaN;
    const scale = props.scale;
  
    function handleChange(e) {
        console.log('e.target.value', e.target.value, typeof(e.target.value));
        props.onHandleChange(e.target.value, scale);
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
        <legend><span id="text"></span>{scaleNames[scale]}{scaleNames2[scale]}</legend>
        <input id="input" value={areaN} onChange={handleChange} onKeyDown={handleKey} autoComplete="off" />
      </fieldset>
  )
}

export default AreaInput

