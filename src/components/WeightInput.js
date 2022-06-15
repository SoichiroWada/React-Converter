import React from 'react';

const scaleNames = {
    milligram:'Milli Gram',
    gram:'Gram',
    kilogram:'Kilo Gram',
    ton:'Ton',
    avoirdupoisGrain:'Grain',
    avoirdupoisDram:'Dram',
    avoirdupoisOunce:'Ounce',
    avoirdupoisPound:'Pound',
    avoirdupoisStone:'Stone',
    avoirdupoisUShundredweight:'US hundred weight',
    avoirdupoisLonghundredweight:'Long hundred weight',
    avoirdupoisShortTon:'Short Ton',
    avoirdupoisLongTon:'Long Ton',
    troyGrain:'Troy Grain',
    troyPennyweight:'Troy Pennyweight',
    troyOunce:'Troy Ounce',
    troyPound:'Troy Pound',
    monme:'Monme',
    ryo:'Ryo',
    kin:'Kin',
    kan:'Kan',
    sumoWrestler:'Sumo Wrestler',
    africanElephant:'African Elephant',
    blueWhale:'Blue Whale',
};

const scaleNames2 = {
    milligram:'（ミリグラム）',
    gram:'（グラム）',
    kilogram:'（キログラム）',
    ton:'（トン）',
    avoirdupoisGrain:'（グレーン）',
    avoirdupoisDram:'（ドラム）',
    avoirdupoisOunce:'（オンス）',
    avoirdupoisPound:'（ポンド）',
    avoirdupoisStone:'（ストーン）',
    avoirdupoisUShundredweight:'（USハンドレッドウェイト - cwt）',
    avoirdupoisLonghundredweight:'（UKハンドレッドウェイト - cwt）',
    avoirdupoisShortTon:'（常衡USトン）',
    avoirdupoisLongTon:'（常衡UKトン）',
    troyGrain:'（トロイ　グレーン）',
    troyPennyweight:'（トロイ　ペニーウェイト）',
    troyOunce:'（トロイ　オンス）',
    troyPound:'（トロイ　ポンド）',
    monme:'（匁）',
    ryo:'（両）',
    kin:'（斤）',
    kan:'（貫）',
    sumoWrestler:'（相撲力士）',
    africanElephant:'（アフリカ象）',
    blueWhale:'（しろながす鯨）',
};

function WeightInput (props) {

  const weightN = props.weightN;
  const scale = props.scale;
  
  function handleChange(e) {
    console.log('e.target.value', e.target.value, typeof(e.target.value));
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
        <legend><span id="text"></span>{scaleNames[scale]}{scaleNames2[scale]}</legend>
        <input id="input" value={weightN} onChange={handleChange} onKeyDown={handleKey} autoComplete="off" />
      </fieldset>
  )
}

export default WeightInput

