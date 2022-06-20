import React from 'react';
import AreaInput from './AreaInput';

//below criterion values: 1 designated scale equals what square meter
const valuesInSquareMeter = {
    squareKiloMeter:1000000,
    squareMeter:1,
    squareCentiMeter:0.0001,
    squareMilliMeter:0.000001,
    are:100,
    hectare:10000,
    squareInch:0.00064516,
    squareFeet:0.09290304,
    squareYard:0.83612736,
    squarePerch:25.29285264,
    squareMile:2.589988110336*(10**6),
    acre:4046.8564224,
    cho:9917.355372,
    tan:991.735537,
    se:99.173553,
    tsubo:3.30578512,
    gou:0.330578512,
    shaku:0.0330578512,    
    shakutsubo:0.09183,
    jo:1.6528926,
    hojo:9.182736453,
    Japan:378000000000,
    USA:9.834*(10**12),
    LandOnEarth:147244000*(10**6),
}

function tryConvert(areaStr, originalScale, targetScale) {

  if (originalScale === targetScale){
    return areaStr;
  }

  const input = parseFloat(areaStr);
  if (Number.isNaN(input)) {
    return '';
  }
  const ratio = valuesInSquareMeter[originalScale]/valuesInSquareMeter[targetScale];
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

class AreaCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.alertMessage = this.alertMessage.bind(this);

    this.state = { 
      originalScale:'',
      areaStr:'',
      alertMessage:'OFF',
    };
  }

  handleChange(areaStr, scale) {
    this.setState({originalScale:scale, areaStr:areaStr});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', areaStr:'', alertMessage: 'OFF'});
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
    const areaStr = this.state.areaStr;
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};

    const squareMeter = tryConvert(areaStr, originalScale, "squareMeter")
    const are = tryConvert(areaStr, originalScale, "are")
    const hectare = tryConvert(areaStr, originalScale, "hectare")
    const squareKiloMeter = tryConvert(areaStr, originalScale, "squareKiloMeter")
    const squareInch = tryConvert(areaStr, originalScale, "squareInch")
    const squareFeet = tryConvert(areaStr, originalScale, "squareFeet")
    const squareYard = tryConvert(areaStr, originalScale, "squareYard")
    const squarePerch = tryConvert(areaStr, originalScale, "squarePerch")
    const acre = tryConvert(areaStr, originalScale, "acre")
    const squareMile = tryConvert(areaStr, originalScale, "squareMile")
    const shaku = tryConvert(areaStr, originalScale, "shaku")
    const gou = tryConvert(areaStr, originalScale, "gou")
    const cho = tryConvert(areaStr, originalScale, "cho")
    const tsubo = tryConvert(areaStr, originalScale, "tsubo")
    const se = tryConvert(areaStr, originalScale, "se")
    const tan = tryConvert(areaStr, originalScale, "tan")
    const shakutsubo = tryConvert(areaStr, originalScale, "shakutsubo")
    const jo = tryConvert(areaStr, originalScale, "jo")    
    const hojo = tryConvert(areaStr, originalScale, "hojo")
    const squareMilliMeter = tryConvert(areaStr, originalScale, "squareMilliMeter")
    const squareCentiMeter = tryConvert(areaStr, originalScale, "squareCentiMeter")
    const Japan = tryConvert(areaStr, originalScale, "Japan")
    const USA = tryConvert(areaStr, originalScale, "USA")
    const LandOnEarth = tryConvert(areaStr, originalScale, "LandOnEarth")

    return (
      <div>
        <h5 id="h5">
          <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
        </h5>
        <div className="uBody row">
            <div className="col s12 m3">

                <AreaInput
                    scale="squareKiloMeter"
                    areaN={squareKiloMeter}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="squareMeter"
                    areaN={squareMeter}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="squareCentiMeter"
                    areaN={squareCentiMeter}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="squareMilliMeter"
                    areaN={squareMilliMeter}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="hectare"
                    areaN={hectare}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />                    
                <AreaInput
                    scale="are"
                    areaN={are}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                </div>


<div className="col s12 m3">
            <AreaInput
                scale="squareMile"
                areaN={squareMile}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onHandleChange={this.handleChange} />
            <AreaInput
              scale="acre"
              areaN={acre}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />         
          <AreaInput
              scale="squarePerch"
              areaN={squarePerch}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />              
            <AreaInput
              scale="squareYard"
              areaN={squareYard}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />              
          <AreaInput
              scale="squareFeet"
              areaN={squareFeet}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
          <AreaInput
              scale="squareInch"
              areaN={squareInch}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />                  

        </div>

        <div className="col s12 m3">
            <AreaInput
              scale="cho"
              areaN={cho}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="tan"
              areaN={tan}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="se"
              areaN={se}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="tsubo"
              areaN={tsubo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />      
            <AreaInput
              scale="gou"
              areaN={gou}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />                            
            <AreaInput
              scale="shaku"
              areaN={shaku}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
        </div>

        <div className="col s12 m3">
            <AreaInput
              scale="shakutsubo"
              areaN={shakutsubo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="jo"
              areaN={jo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />                               
            <AreaInput
              scale="hojo"
              areaN={hojo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />

            <AreaInput
              scale="Japan"
              areaN={Japan}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="USA"
              areaN={USA}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />              
            <AreaInput
              scale="LandOnEarth"
              areaN={LandOnEarth}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />

        </div>
      </div>

        <div className='flex-container'>
          <button id="btn-leng" className="waves-effect waves-light btn" onClick={this.clear}>CLEAR</button>
        </div>
      </div>
    );
  }
}

export default AreaCalculator