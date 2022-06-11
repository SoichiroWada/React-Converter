import React from 'react';
import LengthInput from './LengthInput';

const valuesInMeters = {
  kilo:1000,
  meter:1,
  centi:0.01,
  inch:0.0254,
  feet:0.3048,
  yard:0.9144,
  mile:1609.344,
  sun:0.0303030303030,
  shaku:0.3030303030303,
  ri:3927.27272727272,
  equator:40075017,
  lightSec:299792458,
  earthOrbit:149597870000,
  lightYear:9460730472580800,
}

function converter (length, originalScale, targetScale) {
  const ratio = valuesInMeters[originalScale]/valuesInMeters[targetScale];
  const calculatedValue = length*ratio;
  return calculatedValue;
}

function tryConvert(length, originalScale, targetScale) {
  const input = parseFloat(length);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = converter(input, originalScale, targetScale);
  const rounded = Math.round(output * 1000000000000) / 1000000000000;
  return rounded.toString();
}

class LengthCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.alertMessage = this.alertMessage.bind(this);

    this.state = { 
      originalScale:'',
      length:'',
      alertMessage:'OFF'
    };
  }

  handleChange(length, scale) {
    this.setState({originalScale: scale, length: length});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', length:'' });
  }
  alertMessage(arr){
    if (arr === 229){
      this.setState({
        alertMessage:"ON"
      });
    } else if (arr === 230){
      this.setState({
        alertMessage:"OFF"
      });
    }
  }

  render() {
    
    const originalScale = this.state.originalScale;
    const length = this.state.length;
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};
    const bStyle = this.state.alertMessage === "OFF" ? {display: "inline"} : {display:"none"};

    const kilo = tryConvert(length, originalScale, "kilo")
    const meter = tryConvert(length, originalScale, "meter")
    const centi = tryConvert(length, originalScale, "centi")
    const inch = tryConvert(length, originalScale, "inch")
    const feet = tryConvert(length, originalScale, "feet")
    const yard = tryConvert(length, originalScale, "yard")
    const mile = tryConvert(length, originalScale, "mile")
    const sun = tryConvert(length, originalScale, "sun")
    const shaku = tryConvert(length, originalScale, "shaku")
    const ri = tryConvert(length, originalScale, "ri")
    const equator = tryConvert(length, originalScale, "equator")
    const earthOrbit = tryConvert(length, originalScale, "earthOrbit")
    const lightSec = tryConvert(length, originalScale, "lightSec")
    const lightYear = tryConvert(length, originalScale, "lightYear")

    return (
      <div>
      <h5 id="h5">Length Converter<span id="h5j">（長さの変換）</span><br id="break"></br>
      <span id="ctl" style={bStyle}>Delete key on keyboard to clear</span>
      <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
      </h5>
      <div className="uBody row">
        <div className="col s12 m6">

          <LengthInput
              scale="kilo"
              length={kilo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="meter"
              length={meter}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="centi"
              length={centi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="inch"
              length={inch}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="feet"
              length={feet}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="yard"
              length={yard}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="mile"
              length={mile}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>
        <div className="col s12 m6">
            <LengthInput
              scale="sun"
              length={sun}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="shaku"
              length={shaku}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="ri"
              length={ri}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="equator"
              length={equator}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
                scale="lightSec"
                length={lightSec}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onLengthChange={this.handleChange} />
            <LengthInput
                scale="lightYear"
                length={lightYear}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onLengthChange={this.handleChange} />
            <LengthInput
                scale="earthOrbit"
                length={earthOrbit}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onLengthChange={this.handleChange} />

        </div>
        <button id="btn-leng" className="waves-effect waves-light btn" onClick={this.clear}>CLEAR</button>
      </div>
      </div>
    );
  }
}

export default LengthCalculator