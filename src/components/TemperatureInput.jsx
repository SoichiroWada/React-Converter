import React from 'react';

const scaleNames = {
  c: 'Celsius （摂氏：C)',
  f: 'Fahrenheit（華氏：F）'
};

const Temperature = (props) => {

  function handleChange(e) {
    props.onTemperatureChange(e.target.value);


  }

  function handleKey(event) {
    if (event.key === "Delete") {
      props.onClear()
    } else if (event.keyCode === 32) {
      props.onClear()
    }
  }

    const temperature = props.temperature;
    const scale = props.scale;
    // console.log('this.props in render:', this.props)
    return (
      <fieldset className="rain">
        <legend>Enter temperature in {scaleNames[scale]}</legend>
        <input id="input" value={temperature} onChange={handleChange} onKeyDown={handleKey} autoComplete="off" />
      </fieldset>
    );
}

export default Temperature
