import React from 'react';
import WeightInput from './WeightInput';

const valuesInMeters = {
  milligram:1*(10**-6),
  gram:1*(10**-3),
  kilogram:1,
  grain:64.79891*(10**-6),
  dram:1.7718451953125*(10**-3),
  ounce:28.349523125*(10**-3),
  feet:0.3048,
  yard:0.9144,
  mile:9999.9999,
  sun:0.030303030303030303030303,
  shaku:0.30303030303030303030303,
  ken:1.818181818181818181818181818,
  cho:109.090909090909090909090,
  ri:3927.272727272727272727272,
  kairi:1852,
  fuji:3776,
  everest:8848.86,
  tokyoLondon:9553000,
  equator:40075017,
  lightSec:299792458,
  earthOrbit:149597870000,
  lightYear:9460730472580800,
}

function tryConvert(lengthStr, originalScale, targetScale) {
  if (originalScale === targetScale){
    return lengthStr;
  }

  const input = parseFloat(lengthStr);
  if (Number.isNaN(input)) {
    return '';
  }
  const ratio = valuesInMeters[originalScale]/valuesInMeters[targetScale];
  const output = input*ratio;
  const string = output.toString(10);
  const stringArray = string.split('');

  const testResultForFourZeros = consectiveZeroFinder(stringArray, 4)
  const testResultForSevenZeros = consectiveZeroFinder(stringArray, 7)

  const dotPosition = dotPositionFinder(stringArray) ? dotPositionFinder(stringArray)+1: null;

  // zero continues after dot for 4 zeros
  if (dotPosition && output>1 && testResultForFourZeros) {
    const zeroStartingPositionForFourZeros = testResultForFourZeros-2;
    if (dotPosition < zeroStartingPositionForFourZeros) {
      const slicedStringToArray = stringArray.slice(0, zeroStartingPositionForFourZeros-1);
      const joined = slicedStringToArray.join('');
      const converted = Number(joined);
      return converted;
    }
  } 
  //zero continues 7 times after dot even if the number is zero dot ...
  else if (dotPosition && testResultForSevenZeros) {
    const zeroStartingPositionForSevenZeros = testResultForSevenZeros-5;
    const checkResult = betweenDotAndStartingZeroFinder(stringArray, dotPosition, zeroStartingPositionForSevenZeros);
    if (dotPosition < zeroStartingPositionForSevenZeros && checkResult === "otherNumber") {
      const slicedStringToArray = stringArray.slice(0, zeroStartingPositionForSevenZeros-1);
      const joined = slicedStringToArray.join('');
      const converted = Number(joined);
      return converted;
    }
  }
  const rounded = Math.round(output * 1000000000) / 1000000000;
  return rounded.toString(10);

}

function consectiveZeroFinder (array, zeroCount) {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '0') {
      counter++;
    } else {
      counter = 0;
    }
    if (counter === zeroCount) {
      return i;
    }
  }
  return false;
}

function dotPositionFinder (array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === ".") {
      return i;
    }
  }
  return NaN;
}

function betweenDotAndStartingZeroFinder (array, dotStart, zeroStart) {
  const slicedArrayForOtherNumberCheck = array.slice(dotStart, zeroStart-1);
  let counter = 0;

  for (let i = 0; i < slicedArrayForOtherNumberCheck.length; i++) {
    if (slicedArrayForOtherNumberCheck[i] === '0') {
      counter++;
    }
    if (counter === slicedArrayForOtherNumberCheck.length) {
      return "allZero";
    } else {
      return "otherNumber"
    }
  }
}

class WeightCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.alertMessage = this.alertMessage.bind(this);

    this.state = { 
      originalScale:'',
      lengthStr:'',
      alertMessage:'OFF',
    };
  }

  handleChange(lengthStr, scale) {
    this.setState({originalScale: scale, lengthStr:lengthStr});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', lengthStr:'', alertMessage: 'OFF'});
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
    const lengthStr = this.state.lengthStr;
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};
    const bStyle = this.state.alertMessage === "OFF" ? {display: "inline"} : {display:"none"};

    const kilo = tryConvert(lengthStr, originalScale, "kilo")
    const meter = tryConvert(lengthStr, originalScale, "meter")
    const centi = tryConvert(lengthStr, originalScale, "centi")
    const milli = tryConvert(lengthStr, originalScale, "milli")
    const inch = tryConvert(lengthStr, originalScale, "inch")
    const feet = tryConvert(lengthStr, originalScale, "feet")
    const yard = tryConvert(lengthStr, originalScale, "yard")
    const mile = tryConvert(lengthStr, originalScale, "mile")
    const sun = tryConvert(lengthStr, originalScale, "sun")
    const shaku = tryConvert(lengthStr, originalScale, "shaku")
    const ken = tryConvert(lengthStr, originalScale, "ken")
    const cho = tryConvert(lengthStr, originalScale, "cho")
    const ri = tryConvert(lengthStr, originalScale, "ri")
    const kairi = tryConvert(lengthStr, originalScale, "kairi")
    const fuji = tryConvert(lengthStr, originalScale, "fuji")
    const everest = tryConvert(lengthStr, originalScale, "everest")
    const tokyoLondon = tryConvert(lengthStr, originalScale, "tokyoLondon")    
    const equator = tryConvert(lengthStr, originalScale, "equator")
    const earthOrbit = tryConvert(lengthStr, originalScale, "earthOrbit")
    const lightSec = tryConvert(lengthStr, originalScale, "lightSec")
    const lightYear = tryConvert(lengthStr, originalScale, "lightYear")

    return (
      <div>
        <h5 id="h5">Weight Converter<span id="h5j">（重さの変換）</span><br id="break"></br>
          <span id="ctl" style={bStyle}>Delete key and Space key on keyboard to clear</span>
          <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
        </h5>
      <div className="uBody row">
        <div className="col s12 m4">

          <WeightInput
              scale="kilo"
              lengthN={kilo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <WeightInput
              scale="meter"
              lengthN={meter}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <WeightInput
              scale="centi"
              lengthN={centi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <WeightInput
              scale="milli"
              lengthN={milli}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />              
          <WeightInput
              scale="inch"
              lengthN={inch}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <WeightInput
              scale="feet"
              lengthN={feet}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <WeightInput
              scale="yard"
              lengthN={yard}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>

        <div className="col s12 m4">
            <WeightInput
              scale="mile"
              lengthN={mile}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="sun"
              lengthN={sun}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="shaku"
              lengthN={shaku}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="ken"
              lengthN={ken}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="cho"
              lengthN={cho}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />                           
            <WeightInput
              scale="ri"
              lengthN={ri}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="kairi"
              lengthN={kairi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>

        <div className="col s12 m4">
            
            <WeightInput
              scale="fuji"
              lengthN={fuji}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="everest"
              lengthN={everest}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="tokyoLondon"
              lengthN={tokyoLondon}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />                               
            <WeightInput
              scale="equator"
              lengthN={equator}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="lightSec"
              lengthN={lightSec}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="earthOrbit"
              lengthN={earthOrbit}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <WeightInput
              scale="lightYear"
              lengthN={lightYear}
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

export default WeightCalculator