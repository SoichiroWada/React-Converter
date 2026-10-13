import React from 'react';
import { isApproximate, unitNote } from '../conversion/units';

const scaleNames = {
    milligram:'Milli Gram',
    gram:'Gram',
    kilogram:'Kilo Gram',
    ton:'Tonne',
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
    ryo:'Ryo (10 monme)',
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
      <fieldset className="rain" title={unitNote('mass', scale)}>
        <legend><span id="text"></span>{scaleNames[scale]}{scaleNames2[scale]}{isApproximate('mass', scale) ? ' ≈' : ''}</legend>
        <input id="input" value={weightN} onChange={handleChange} onKeyDown={handleKey} autoComplete="off" />
      </fieldset>
  )
}

export default WeightInput

