import React from 'react';
import LengthInput from './LengthInput';

function meterToMile(meter) {
  return meter * 0.0006213712;
}
function meterToFeet(meter) {
    return meter * 3.28084;
}
function mileToMeter(mile) {
  return mile * 1609.344;
}
function mileToFeet(mile) {
    return mile * 5280;
  }
function feetToMeter(feet) {
    return feet * 0.3048;
}
function feetToMile(feet) {
    return feet * 0.000189394;
}

function tryConvert(length, converter) {
  const input = parseFloat(length);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = converter(input);
  const rounded = Math.round(output * 10000000000) / 10000000000;
  return rounded.toString();
}

class LengthCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeMeter = this.handleChangeMeter.bind(this);
    this.handleChangeMile = this.handleChangeMile.bind(this);
    this.handleChangeFeet = this.handleChangeFeet.bind(this);
    this.clear = this.clear.bind(this);

    this.state = { 
        originalScale:'', 
        meterLength:'',
        mileLength:'',
        feetLength:''
    };
  }

  handleChangeMeter(length) {
    this.setState({originalScale: 'meter', meterLength:length});
    // console.log(this.state);
  }

  handleChangeMile(length) {
    this.setState({originalScale:'mile', mileLength:length});
    // console.log(this.state);
  }

  handleChangeFeet(length) {
    this.setState({originalScale:'feet', feetLength:length});
    // console.log(this.state);
  }

  clear(){
    console.clear();
    this.setState({originalScale:'', meterLength:'', mileLength:'',feetLength:'' });
  }

  render() {
    const scale = this.state.originalScale;
    const meterLength = this.state.meterLength;
    const mileLength = this.state.mileLength;
    const feetLength = this.state.feetLength;

    const meter = scale === 'mile' ? tryConvert(mileLength, mileToMeter) 
    : scale === 'feet' ? tryConvert(feetLength, feetToMeter) : meterLength;

    const mile = scale === 'meter' ? tryConvert(meterLength, meterToMile) 
    : scale === 'feet' ? tryConvert(feetLength, feetToMile) : mileLength;

    const feet = scale === 'meter' ? tryConvert(meterLength, meterToFeet) 
    : scale === 'mile' ? tryConvert(mileLength, mileToFeet) : feetLength;

    // let meter, mile, feet;
    // if (scale === "meter") {
    //     meter = meterLength;
    //     mile = tryConvert(meterLength, meterToMile);
    //     feet = tryConvert(meterLength, meterToFeet)
    // } else if (scale === "mile") {
    //     meter = tryConvert(mileLength, mileToMeter);
    //     mile = mileLength;
    //     feet = tryConvert(mileLength, mileToFeet);
    // } else if (scale === "feet") {
    //     meter = tryConvert(feetLength, feetToMeter);
    //     mile = tryConvert(feetLength, feetToMile);
    //     feet = feetLength;
    // }

    return (
      <div className="uBody">
        <h4>Length Converter（長さの変換）</h4>
        <LengthInput
            scale="meter"
            length={meter}
            onLengthChange={this.handleChangeMeter} />
        <p></p>
        <LengthInput
            scale="mile"
            length={mile}
            onLengthChange={this.handleChangeMile} />
        <LengthInput
            scale="feet"
            length={feet}
            onLengthChange={this.handleChangeFeet} />

        <button id="btn" className="waves-effect waves-light btn" onClick={this.clear}>CLEAR</button>

      </div>
    );
  }
}

export default LengthCalculator