import React from 'react';

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
    year: 'Year',
    fourYears:'4 Years',
    decade: 'Decade',
    century:'Century', 
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
        <input id="input" value={timeN} onChange={handleChange} onKeyDown={handleKey} autoComplete="off" />
      </fieldset>
  )
}

export default LengthInput

