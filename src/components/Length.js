import React from 'react';
import LengthInput from './LengthInput';

//below criterion value is that 1 that scale equals what meter
const valuesInMeters = {
  kilo:1000,
  meter:1,
  centi:0.01,
  milli:0.001,
  inch:0.0254,
  feet:0.3048,
  yard:0.9144,
  mile:1609.344,
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

  const testResultForFourZeros = consectiveZerosUnderDotFinder(stringArray, 4)
  const testResultForNineNines = consectiveNineFinder(stringArray)
  const dotPosition = dotPositionFinder(stringArray) ? dotPositionFinder(stringArray)+1: null;

  if (testResultForNineNines) {
    const realLastNinePosition = testResultForNineNines + 1;

    if (dotPosition) {
      if (dotPosition < realLastNinePosition) {
        const differenceBetweenDotAndlastNine = realLastNinePosition - dotPosition;
        const valueForMathRound = differenceBetweenDotAndlastNine;
        const adjusted = Math.round(output*(10**valueForMathRound))/(10**valueForMathRound)
        return adjusted
      }
      else if (realLastNinePosition < dotPosition) {
        const differenceBetweenDotAndlastNine = dotPosition - realLastNinePosition;
        const valueForMathRound = differenceBetweenDotAndlastNine;
        const adjusted = Math.round(output/(10**valueForMathRound))*(10**valueForMathRound)
        return adjusted
      }
    } else {
      const difference = stringArray.length - realLastNinePosition;
      const valueForMathRound = difference;
      const adjusted = Math.round(output/(10**valueForMathRound))*(10**valueForMathRound)
      return adjusted;
    }
  }

  // zero continues after dot for 4 zeros
  if (dotPosition && testResultForFourZeros) {
    const zeroStartingPositionForFourZeros = testResultForFourZeros-2;
    const slicedStringToArray = stringArray.slice(0, zeroStartingPositionForFourZeros-1);
    const joined = slicedStringToArray.join('');
    const converted = Number(joined);
    return converted;
  }
  
  const rounded = Math.round(output * 1000000000) / 1000000000;
  return rounded
  // return output;
}

function consectiveNineFinder (array) {
  let counter = 0;
  let dotCounter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '9') {
      counter++;
    } else if (array[i] === '.') {
      dotCounter++;
    } else {
      counter = 0;
    }
    if (counter === 9) {
      if (dotCounter > 1){
        return "Invalid Input";
      } else {
        return i;
      }
    }
  }
  return false;
}


function consectiveZerosUnderDotFinder (array, zeroCount) {
  let counter = 0;
  let dotCounter = 0;
  let underDotPosition = false;
  const numbersStr = ['1','2','3','4','5','6','7','8','9'];
  let leadingNotZeroNumberExists = false;
  for (let i = 0; i < array.length; i++) {
      if (array[i] === '.') {
          dotCounter++;
          dotCounter === 1 ? underDotPosition = true : underDotPosition = false; 
      }
      if (numbersStr.includes(array[i])) {
          leadingNotZeroNumberExists = true;
      }
      if (leadingNotZeroNumberExists && underDotPosition && array[i] === '0') {
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

class LengthCalculator extends React.Component {

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
        <h5 id="h5">
          <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
        </h5>
      <div className="uBody row">
        <div className="col s12 m4">

          <LengthInput
              scale="kilo"
              lengthN={kilo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="meter"
              lengthN={meter}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="centi"
              lengthN={centi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="milli"
              lengthN={milli}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />              
          <LengthInput
              scale="inch"
              lengthN={inch}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="feet"
              lengthN={feet}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="yard"
              lengthN={yard}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>

        <div className="col s12 m4">
            <LengthInput
              scale="mile"
              lengthN={mile}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="sun"
              lengthN={sun}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="shaku"
              lengthN={shaku}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="ken"
              lengthN={ken}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="cho"
              lengthN={cho}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />                           
            <LengthInput
              scale="ri"
              lengthN={ri}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="kairi"
              lengthN={kairi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>

        <div className="col s12 m4">
            
            <LengthInput
              scale="fuji"
              lengthN={fuji}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="everest"
              lengthN={everest}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="tokyoLondon"
              lengthN={tokyoLondon}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />                               
            <LengthInput
              scale="equator"
              lengthN={equator}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="lightSec"
              lengthN={lightSec}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="earthOrbit"
              lengthN={earthOrbit}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="lightYear"
              lengthN={lightYear}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />

        </div>
      </div>

        <div className='flex-container'>
          <button id="btn-leng" className="waves-effect waves-light btn" onClick={this.clear}>CLEAR</button>
        </div>
      </div>
    );
  }
}

export default LengthCalculator