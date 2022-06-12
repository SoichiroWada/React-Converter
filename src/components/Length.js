import React from 'react';
import LengthInput from './LengthInput';

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

function tryConvert(length, originalScale, targetScale) {

  const input = parseFloat(length);
  if (Number.isNaN(input)) {
    return '';
  }

  const ratio = valuesInMeters[originalScale]/valuesInMeters[targetScale];
  const output = length*ratio;
  console.log('false indicates Number:',Number.isNaN(output))

  const string = output.toString(10);
  console.log('output', output);
  console.log('string', string);

  const stringArray = string.split('');
  console.log('stringArray', stringArray);

  const testResultForFourZeros = consectiveZeroFinder(stringArray, 4)
  const testResultForSevenZeros = consectiveZeroFinder(stringArray, 7)
  console.log('testResultForFourZeros:', testResultForFourZeros);
  console.log('testResultForSevenZeros', testResultForFourZeros);
  // const zeroStartingPositionForFourZeros = testResultForFourZeros-2;
  const dotPosition = dotPositionFinder(stringArray)+1;
  console.log('dotPosition', dotPosition);

  // zero continues after dot for 4 zeros
  if (output>1 && testResultForFourZeros) {
    console.log(targetScale);
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXX');
    const zeroStartingPositionForFourZeros = testResultForFourZeros-2;
    console.log('zeroStartingPositionForFourZeros', zeroStartingPositionForFourZeros);

    if (dotPosition < zeroStartingPositionForFourZeros) {
      const slicedStringToArray = stringArray.slice(0, zeroStartingPositionForFourZeros-1);
      console.log('slicedStringToArray:', slicedStringToArray);
      const joined = slicedStringToArray.join('');
      console.log('joined',joined);
      const converted = Number(joined);
      return converted;
    }
  } 
  //zero continues 7 times after dot even if the number is zero dot ...
  else if (testResultForSevenZeros) {
    console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
    const zeroStartingPositionForSevenZeros = testResultForSevenZeros-5;

    const checkResult = betweenDotAndStartingZeroFinder(stringArray, dotPosition, zeroStartingPositionForSevenZeros);

    if (dotPosition < zeroStartingPositionForSevenZeros && checkResult === "otherNumber") {
      const slicedStringToArray = stringArray.slice(0, zeroStartingPositionForSevenZeros-1);
      console.log('slicedStringToArray2:', slicedStringToArray);
      const joined = slicedStringToArray.join('');
      console.log('joined string:',joined);
      const converted = Number(joined);
      return converted;
    }
  }

  const rounded = Math.round(output * 1000000000) / 1000000000;
  return rounded;
  // return output;
}

function consectiveZeroFinder (array, zeroCount) {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '0') {
      counter++;
      console.log('counter:',counter);
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
}

function betweenDotAndStartingZeroFinder (array, dotStart, zeroStart) {

  const slicedArrayForOtherNumberCheck = array.slice(dotStart, zeroStart-1);
  console.log('slicedArrayForOtherNumberCheck',slicedArrayForOtherNumberCheck)

  let counter = 0;

  for (let i = 0; i < slicedArrayForOtherNumberCheck.length; i++) {
    if (slicedArrayForOtherNumberCheck[i] === '0') {
      counter++;
    }
    if (counter === slicedArrayForOtherNumberCheck.length) {
      console.log("allZero")
      return "allZero";
    } else {
      console.log("otherNumber")
      return "otherNumber"
    }
  }
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
    const milli = tryConvert(length, originalScale, "milli")
    const inch = tryConvert(length, originalScale, "inch")
    const feet = tryConvert(length, originalScale, "feet")
    const yard = tryConvert(length, originalScale, "yard")
    const mile = tryConvert(length, originalScale, "mile")
    const sun = tryConvert(length, originalScale, "sun")
    const shaku = tryConvert(length, originalScale, "shaku")
    const ken = tryConvert(length, originalScale, "ken")
    const cho = tryConvert(length, originalScale, "cho")
    const ri = tryConvert(length, originalScale, "ri")
    const kairi = tryConvert(length, originalScale, "kairi")
    const fuji = tryConvert(length, originalScale, "fuji")
    const everest = tryConvert(length, originalScale, "everest")
    const tokyoLondon = tryConvert(length, originalScale, "tokyoLondon")    
    const equator = tryConvert(length, originalScale, "equator")
    const earthOrbit = tryConvert(length, originalScale, "earthOrbit")
    const lightSec = tryConvert(length, originalScale, "lightSec")
    const lightYear = tryConvert(length, originalScale, "lightYear")

    return (
      <div>
      <h5 id="h5">Length Converter<span id="h5j">（長さの変換）</span><br id="break"></br>
      <span id="ctl" style={bStyle}>Delete key and Space key on keyboard to clear</span>
      <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
      </h5>
      <div className="uBody row">
        <div className="col s12 m4">
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
              scale="milli"
              length={milli}
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
        </div>

        <div className="col s12 m4">
            <LengthInput
              scale="mile"
              length={mile}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
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
              scale="ken"
              length={ken}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="cho"
              length={cho}
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
              scale="kairi"
              length={kairi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>

        <div className="col s12 m4">
            
            <LengthInput
              scale="fuji"
              length={fuji}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="everest"
              length={everest}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="tokyoLondon"
              length={tokyoLondon}
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
                scale="earthOrbit"
                length={earthOrbit}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onLengthChange={this.handleChange} />
            <LengthInput
                scale="lightYear"
                length={lightYear}
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