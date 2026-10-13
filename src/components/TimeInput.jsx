import React from 'react';
import { isApproximate, unitNote } from '../conversion/units';

const scaleNames = {
    second: 'Second',
    milli: 'Milli Second',
    minute: 'Minute',
    hour: 'Hour',
    day:'Day',
    week: 'Week',
    month28: 'Month28',
    month29: 'Month29',
    month30: 'Month30',
    month31: 'Month31',
    year: 'Year (365 days)',
    fourYears:'4 Years (1,460 days)',
    decade: 'Decade (3,650 days)',
    century:'Century (36,500 days)',
};
const scaleNames2 = {
    second: '（秒）',
    milli: '（ミリ秒）',
    minute: '（分）',
    hour: '（時）',
    day:'（日）',
    week: '（週）',
    month28: '（月－28日）',
    month29: '（月－29日）',
    month30: '（月－30日）',
    month31: '（月－31日）',
    year: '（年）',
    fourYears:'（4年）',
    decade: '（10年）',
    century:'（100年）', 
};

function LengthInput (props) {

  const timeN = props.timeN;
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
      <fieldset className="rain" title={unitNote('time', scale)}>
        <legend><span id="text"></span>{scaleNames[scale]}{scaleNames2[scale]}{isApproximate('time', scale) ? ' ≈' : ''}</legend>
        <input id="input" value={timeN} onChange={handleChange} onKeyDown={handleKey} autoComplete="off" />
      </fieldset>
  )
}

export default LengthInput

